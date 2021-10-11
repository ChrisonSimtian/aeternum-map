import type { ReactNode } from 'react';
import { createContext, useEffect, useState, useContext } from 'react';
import { getPosition } from '../utils/ocr';
import { usePersistentState } from '../utils/storage';

type PositionContextProps = {
  position: [number, number] | null;
  tracking: boolean;
  following: boolean;
  toggleTracking: () => void;
  toggleFollowing: () => void;
};
const PositionContext = createContext<PositionContextProps>({
  position: null,
  tracking: false,
  following: true,
  toggleTracking: () => undefined,
  toggleFollowing: () => undefined,
});

type PositionProviderProps = {
  children: ReactNode;
};

export function PositionProvider({
  children,
}: PositionProviderProps): JSX.Element {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [tracking, setTracking] = usePersistentState<boolean>(
    'tracking',
    false
  );
  const [following, setFollowing] = usePersistentState<boolean>(
    'following',
    false
  );

  useEffect(() => {
    if (!tracking) {
      return;
    }
    let handler = setTimeout(updatePosition, 0);

    async function updatePosition() {
      try {
        const position = await getPosition();
        setPosition(position);
        handler = setTimeout(updatePosition, 0);
      } catch (error) {
        console.error(error);
        handler = setTimeout(updatePosition, 0);
      }
    }

    return () => {
      clearTimeout(handler);
    };
  }, [tracking]);

  function toggleTracking() {
    setTracking(!tracking);
  }

  function toggleFollowing() {
    setFollowing(!following);
  }
  return (
    <PositionContext.Provider
      value={{ position, tracking, following, toggleTracking, toggleFollowing }}
    >
      {children}
    </PositionContext.Provider>
  );
}

export function usePosition(): PositionContextProps {
  return useContext(PositionContext);
}
