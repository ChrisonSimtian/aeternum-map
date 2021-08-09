import { useEffect, useMemo, useRef } from 'react';
import leaflet from 'leaflet';
import { Marker } from '../../useMarkers';
import { FilterItem, mapFilters } from '../MapFilter/mapFilters';
import { useURL } from '../Router/Router';

const LeafIcon: new ({ iconUrl }: { iconUrl: string }) => leaflet.Icon =
  leaflet.Icon.extend({
    options: {
      iconSize: [64, 64],
      iconAnchor: [32, 32],
      tooltipAnchor: [0, -32],
    },
  });

function useLayerGroups({
  leafletMap,
  markers,
  onMarkerClick,
}: {
  leafletMap: leaflet.Map | null;
  markers: Marker[];
  onMarkerClick: ({
    marker,
    filterItem,
  }: {
    marker: Marker;
    filterItem: FilterItem;
  }) => void;
}): void {
  const url = useURL();

  const searchParam = url.searchParams.get('mapFilters');
  const filters = useMemo(
    () => (searchParam?.length ? searchParam.split(',') : []),
    [searchParam]
  );
  const layerGroupByFilterRef = useRef<{
    [filterType: string]: leaflet.LayerGroup;
  }>({});

  const newFilters = useMemo(() => {
    if (!leafletMap || !leafletMap.getPane('markerPane')) {
      return [];
    }
    const newFilters = [...filters];
    Object.entries(layerGroupByFilterRef.current).forEach(
      ([filterType, layerGroup]) => {
        if (!newFilters.includes(filterType)) {
          leafletMap.removeLayer(layerGroup);
          delete layerGroupByFilterRef.current[filterType];
        } else {
          newFilters.splice(newFilters.indexOf(filterType), 1);
        }
      }
    );
    return newFilters;
  }, [typeof leafletMap, filters]);

  useEffect(() => {
    if (!leafletMap || !leafletMap.getPane('markerPane') || !markers.length) {
      return;
    }

    newFilters.map((filter) => {
      const mapFilter = mapFilters.find(
        (mapFilter) => mapFilter.type === filter
      );
      if (!mapFilter) {
        console.warn(`No markers for filter ${filter}`);
        return;
      }
      const markersOfType = markers.filter(
        (marker) => marker.type === mapFilter.type
      );
      const icon = new LeafIcon({ iconUrl: mapFilter.iconUrl });

      const existingLayerGroup = layerGroupByFilterRef.current[mapFilter.type];
      if (existingLayerGroup) {
        leafletMap.removeLayer(existingLayerGroup);
      }
      const layerGroup = new leaflet.LayerGroup(
        markersOfType.map((markerOfType) => {
          const marker = leaflet
            .marker([markerOfType.position[1], markerOfType.position[0]], {
              icon,
            })
            .bindTooltip(mapFilter.title, { direction: 'top' });
          marker.on('click', () => {
            onMarkerClick({ marker: markerOfType, filterItem: mapFilter });
          });
          return marker;
        })
      );
      layerGroup.addTo(leafletMap);
      layerGroupByFilterRef.current[mapFilter.type] = layerGroup;
    });
  }, [newFilters, typeof leafletMap, markers]);
}

export default useLayerGroups;
