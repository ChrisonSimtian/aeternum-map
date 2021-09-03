import { useEffect, useRef, useState } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRouter } from '../Router/Router';
import { useMarkers } from '../../contexts/MarkersContext';
const { VITE_API_ENDPOINT } = import.meta.env;

function toThreeDigits(number: number): string {
  if (number < 10) {
    return `00${number}`;
  }
  if (number < 100) {
    return `0${number}`;
  }
  return `${number}`;
}

const worldCRS = leaflet.extend({}, leaflet.CRS.Simple, {
  transformation: new leaflet.Transformation(1 / 16, 0, -1 / 16, 0),
});

const WorldTiles = leaflet.TileLayer.extend({
  getTileUrl(coords: { x: number; y: number; z: number }) {
    const zoom = 8 - coords.z - 1;
    const multiplicators = [1, 2, 4, 8, 16, 32, 64];
    const x = coords.x * multiplicators[zoom - 1];
    const y = (-coords.y - 1) * multiplicators[zoom - 1];

    if (x < 0 || y < 0 || y >= 64 || x >= 64) {
      return `${VITE_API_ENDPOINT}/assets/map/empty.webp`;
    }
    // return `/map/map_l1_y000_x024.webp`;
    return `${VITE_API_ENDPOINT}/assets/map/map_l${zoom}_y${toThreeDigits(
      y
    )}_x${toThreeDigits(x)}.webp`;
  },
  getTileSize() {
    return { x: 1024, y: 1024 };
  },
});

type UseWorldMapProps = {
  selectMode: boolean;
};
function useWorldMap({ selectMode }: UseWorldMapProps): {
  elementRef: React.MutableRefObject<HTMLDivElement | null>;
  leafletMap: leaflet.Map | null;
} {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [leafletMap, setLeafletMap] = useState<leaflet.Map | null>(null);
  const { url, search, go } = useRouter();

  useEffect(() => {
    const mapElement = elementRef.current;
    if (!mapElement) {
      return;
    }

    const southWest = leaflet.latLng(0, 4000);
    const northEast = leaflet.latLng(10000, 14336);
    const bounds = leaflet.latLngBounds(southWest, northEast);
    const map = leaflet.map(mapElement, {
      crs: worldCRS,
      maxZoom: 6,
      minZoom: 0,
      attributionControl: false,
      zoomControl: false,
    });
    setLeafletMap(map);

    const lat = url.searchParams.get('y');
    const lng = url.searchParams.get('x');
    const zoom = url.searchParams.get('zoom');
    if (lat !== null && lng !== null && zoom !== null) {
      map.setView([+lat, +lng], +zoom);
    } else {
      map.fitBounds(bounds);
      const center = map.getCenter();
      search({
        x: center.lng.toString(),
        y: center.lat.toString(),
        zoom: map.getZoom().toString(),
      });
    }
    leaflet.control.zoom({ position: 'topright' }).addTo(map);

    const divElement = leaflet.DomUtil.create('div', 'leaflet-position');
    function handleMouseMove(event: leaflet.LeafletMouseEvent) {
      divElement.innerHTML = `<span>[${event.latlng.lng.toFixed(
        2
      )}, ${event.latlng.lat.toFixed(2)}]</span>`;
    }

    const CoordinatesControl = leaflet.Control.extend({
      onAdd(map: leaflet.Map) {
        map.on('mousemove', handleMouseMove);
        return divElement;
      },
      onRemove(map: leaflet.Map) {
        map.off('mousemove', handleMouseMove);
      },
    });

    const coordinates = new CoordinatesControl({ position: 'bottomright' });
    coordinates.addTo(map);

    const worldTiles = new WorldTiles();
    worldTiles.addTo(map);

    map.on('click', () => {
      go('/', true);
    });

    return () => {
      setLeafletMap(null);
      map.remove();
    };
  }, [elementRef]);

  if (!selectMode) {
    const x = +(url.searchParams.get('x') || 0);
    const y = +(url.searchParams.get('y') || 0);
    const { markers } = useMarkers();

    useEffect(() => {
      if (leafletMap && leafletMap.getPane('mapPane') && x && y) {
        const center = leafletMap.getCenter();
        if (Math.abs(center.lat - y) > 0.5 || Math.abs(center.lng - x) > 0.5) {
          leafletMap.setView([y, x]);
        }
      }
    }, [leafletMap, x, y]);

    useEffect(() => {
      if (leafletMap && url.pathname) {
        const marker = markers.find(
          (marker) => marker._id === url.pathname.slice(1)
        );
        if (marker) {
          if (marker.position) {
            leafletMap.setView([marker.position[1], marker.position[0]]);
          } else if (marker.positions) {
            leafletMap.setView([
              marker.positions[0][1],
              marker.positions[0][0],
            ]);
          }
        }
      }
    }, [leafletMap, url.pathname, markers]);

    useEffect(() => {
      if (!leafletMap) {
        return;
      }
      const handleMoveEnd = () => {
        const center = leafletMap.getCenter();

        search({
          x: center.lng.toString(),
          y: center.lat.toString(),
          zoom: leafletMap.getZoom().toString(),
        });
      };
      leafletMap.on('moveend', handleMoveEnd);

      return () => {
        leafletMap.off('moveend', handleMoveEnd);
      };
    }, [leafletMap, url]);
  }

  return { elementRef, leafletMap };
}

export default useWorldMap;
