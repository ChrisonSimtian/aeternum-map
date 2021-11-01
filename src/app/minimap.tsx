import type { MouseEvent } from 'react';
import { StrictMode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './globals.css';
import { waitForOverwolf } from './utils/overwolf';
import { UserProvider } from './contexts/UserContext';
import { MarkersProvider } from './contexts/MarkersContext';
import { PositionProvider } from './contexts/PositionContext';
import WorldMap from './components/WorldMap/WorldMap';
import styles from './Minimap.module.css';
import { dragMoveWindow, dragResize, WINDOWS } from './utils/windows';
import {
  SETUP_MINIMAP,
  ZOOM_IN_MINIMAP,
  ZOOM_OUT_MINIMAP,
} from './utils/hotkeys';
import { usePersistentState } from './utils/storage';
import { FiltersProvider } from './contexts/FiltersContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { classNames } from './utils/styles';
import ResizeBorder from './components/ResizeBorder/ResizeBorder';

function onDragResize(edge: overwolf.windows.enums.WindowDragEdge) {
  return async (event: MouseEvent) => {
    event.stopPropagation();
    await dragResize(edge, true);
  };
}

function Minimap(): JSX.Element {
  const [showSetup, setShowSetup] = useState(false);
  const [minimapOpacity, setMinimapOpacity] = usePersistentState(
    'minimapOpacity',
    80
  );
  const [minimapBorderRadius, setMinimapBorderRadius] = usePersistentState(
    'minimapBorderRadius',
    50
  );
  const [minimapZoom, setMinimapZoom] = usePersistentState('minimapZoom', 5);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isHovering) {
      return;
    }
    const handleKeyDown = (event: overwolf.games.inputTracking.KeyEvent) => {
      // ESC
      if (event.key === '27') {
        setIsHovering(false);
      }
    };
    overwolf.games.inputTracking.onKeyDown.addListener(handleKeyDown);
    return () => {
      overwolf.games.inputTracking.onKeyDown.removeListener(handleKeyDown);
    };
  }, [isHovering]);

  useEffect(() => {
    if (showSetup) {
      overwolf.windows.removeWindowStyle(
        WINDOWS.MINIMAP,
        overwolf.windows.enums.WindowStyle.InputPassThrough,
        () => undefined
      );
      overwolf.windows.bringToFront(WINDOWS.MINIMAP, true, () => undefined);
    } else {
      overwolf.windows.setWindowStyle(
        WINDOWS.MINIMAP,
        overwolf.windows.enums.WindowStyle.InputPassThrough,
        () => undefined
      );
      overwolf.windows.sendToBack(WINDOWS.MINIMAP, () => undefined);
    }

    async function handleHotkeyPressed(
      event: overwolf.settings.hotkeys.OnPressedEvent
    ) {
      if (event.name === SETUP_MINIMAP) {
        setShowSetup(!showSetup);
      } else if (event.name === ZOOM_IN_MINIMAP) {
        setMinimapZoom((minimapZoom) => Math.min(minimapZoom + 1, 6));
      } else if (event.name === ZOOM_OUT_MINIMAP) {
        setMinimapZoom((minimapZoom) => Math.max(minimapZoom - 1, 0));
      }
    }
    overwolf.settings.hotkeys.onPressed.addListener(handleHotkeyPressed);
    return () => {
      overwolf.settings.hotkeys.onPressed.removeListener(handleHotkeyPressed);
    };
  }, [showSetup, minimapZoom]);

  return (
    <>
      <div
        onMouseMove={() => setIsHovering(true)}
        className={classNames(
          styles.container,
          !showSetup && isHovering && styles.hideOnHover
        )}
        style={{
          opacity: minimapOpacity / 100,
          borderRadius: `${minimapBorderRadius}%`,
        }}
      >
        <WorldMap
          hideControls
          alwaysFollowing
          initialZoom={minimapZoom}
          className={styles.noMouseEvents}
        />
      </div>
      {showSetup && (
        <div className={styles.setup} onMouseDown={dragMoveWindow}>
          <div className={styles.toolbar} onMouseDown={dragMoveWindow}>
            <label>
              Zoom
              <input
                type="range"
                value={minimapZoom}
                min={0}
                max={6}
                onMouseDown={(event) => event.stopPropagation()}
                onChange={(event) => setMinimapZoom(+event.target.value)}
              />
            </label>
            <label>
              Border
              <input
                type="range"
                value={minimapBorderRadius}
                min={0}
                max={50}
                onMouseDown={(event) => event.stopPropagation()}
                onChange={(event) =>
                  setMinimapBorderRadius(+event.target.value)
                }
              />
            </label>
            <label>
              Opacity
              <input
                type="range"
                value={minimapOpacity}
                min={20}
                max={100}
                onMouseDown={(event) => event.stopPropagation()}
                onChange={(event) => setMinimapOpacity(+event.target.value)}
              />
            </label>
            <svg
              className={styles.move}
              onMouseDown={dragMoveWindow}
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="currentColor"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z" />
            </svg>
            <svg
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="currentColor"
              className={styles.bottomRightBorder}
              onMouseDown={onDragResize(
                overwolf.windows.enums.WindowDragEdge.BottomRight
              )}
            >
              <path d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z" />
            </svg>
            <ResizeBorder square />
          </div>
        </div>
      )}
    </>
  );
}

waitForOverwolf().then(() => {
  ReactDOM.render(
    <StrictMode>
      <SettingsProvider>
        <UserProvider>
          <FiltersProvider>
            <MarkersProvider readonly>
              <PositionProvider>
                <Minimap />
              </PositionProvider>
            </MarkersProvider>
          </FiltersProvider>
        </UserProvider>
      </SettingsProvider>
    </StrictMode>,
    document.querySelector('#root')
  );
});
