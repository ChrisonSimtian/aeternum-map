import { useState } from 'react';
import { useModal } from '../../contexts/ModalContext';
import { classNames } from '../../utils/styles';
import { useRouter } from '../Router/Router';
import AddIcon from '../icons/AddIcon';
import AreasView from './AreasView';
import styles from './MapFilter.module.css';
import MapIcon from '../icons/MapIcon';
import MarkerIcon from '../icons/MarkerIcon';
import MarkersView from './MarkersView';
import MenuOpenIcon from '../icons/MenuOpenIcon';
import AddResources from '../AddResources/AddResources';
import { usePosition } from '../../contexts/PositionContext';
import Ads from '../Ads/Ads';
import NearBy from '../NearBy/NearBy';
import User from '../User/User';
import NearByIcon from '../icons/NearByIcon';
import PlayerIcon from '../icons/PlayerIcon';

type View = 'markers' | 'areas' | 'nearBy';

function MapFilter(): JSX.Element {
  const { addModal } = useModal();
  const [isOpen, setIsOpen] = useState(true);
  const { url, search } = useRouter();
  const { following, toggleFollowing, toggleTracking } = usePosition();

  function handleViewClick(view: View) {
    setIsOpen(true);
    search({
      filterCategory: view,
    });
  }
  const view = url.searchParams.get('filterCategory') || 'markers';

  return (
    <aside className={classNames(styles.container, isOpen && styles.open)}>
      <div className={styles.content}>
        <User />
        {view === 'markers' && <MarkersView />}
        {view === 'areas' && <AreasView />}
        {view === 'nearBy' && <NearBy />}
        <Ads />
      </div>
      <nav className={styles.nav}>
        <button
          className={styles.nav__button}
          data-tooltip="Add resources"
          data-tooltip-position="right"
          onClick={() =>
            addModal({
              title: 'Add resources',
              children: <AddResources />,
            })
          }
        >
          <AddIcon />
        </button>
        <button
          data-tooltip="Markers"
          data-tooltip-position="right"
          className={classNames(
            styles.nav__button,
            styles.nav__border,
            view === 'markers' && styles.nav__active
          )}
          onClick={() => handleViewClick('markers')}
        >
          <MarkerIcon />
        </button>
        <button
          data-tooltip="Areas (Coming Soon)"
          data-tooltip-position="right"
          disabled
          className={classNames(
            styles.nav__button,
            view === 'areas' && styles.nav__active
          )}
          onClick={() => handleViewClick('areas')}
        >
          <MapIcon />
        </button>
        <button
          data-tooltip="Near by (Coming Soon)"
          data-tooltip-position="right"
          disabled
          className={classNames(
            styles.nav__button,
            view === 'nearBy' && styles.nav__active
          )}
          onClick={() => handleViewClick('nearBy')}
        >
          <NearByIcon />
        </button>

        <button
          data-tooltip="Follow position"
          data-tooltip-position="right"
          disabled
          onClick={() => {
            toggleFollowing();
            toggleTracking();
          }}
          className={classNames(
            styles.nav__button,
            styles.nav__border,
            following && styles.nav__active
          )}
        >
          <PlayerIcon />
        </button>
        <button
          data-tooltip="Show/Hide menu"
          data-tooltip-position="right"
          className={classNames(styles.nav__button, styles.nav__border)}
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuOpenIcon />
        </button>
      </nav>
    </aside>
  );
}

export default MapFilter;
