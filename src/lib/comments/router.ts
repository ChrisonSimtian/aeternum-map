import { Router } from 'express';
import type { Filter } from 'mongodb';
import { ObjectId } from 'mongodb';
import { ensureAuthenticated } from '../auth/middlewares';
import { postToDiscord } from '../discord';
import { getMarkersCollection } from '../markers/collection';
import { getCommentsCollection } from './collection';
import type { CommentDTO } from './types';

const commentsRouter = Router();

commentsRouter.delete('/:commentId', ensureAuthenticated, async (req, res) => {
  const { commentId } = req.params;
  const account = req.account!;

  if (!ObjectId.isValid(commentId)) {
    res.status(400).send('Invalid payload');
    return;
  }

  const query: Filter<CommentDTO> = {
    _id: new ObjectId(commentId),
  };
  if (!account.isModerator) {
    query.userId = account.steamId;
  }

  const comment = await getCommentsCollection().findOne(query);
  if (!comment) {
    res.status(404).end(`No comment found ${commentId}`);
    return;
  }

  const result = await getCommentsCollection().deleteOne(query);
  if (!result.deletedCount) {
    res.status(404).end(`No comment found ${commentId}`);
    return;
  }

  await getMarkersCollection().updateOne(
    { _id: new ObjectId(comment.markerId) },
    {
      $set: {
        comments: await getCommentsCollection()
          .find({ markerId: new ObjectId(comment.markerId) })
          .count(),
      },
    }
  );

  res.status(200).json({});
  postToDiscord(`✍💀 Comment deleted by ${account.name}`);
});

export default commentsRouter;
