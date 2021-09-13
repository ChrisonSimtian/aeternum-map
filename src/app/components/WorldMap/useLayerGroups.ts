import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import { mapFilters } from '../MapFilter/mapFilters';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import type { Marker } from '../../contexts/MarkersContext';
import { getTooltipContent } from './tooltips';
import { classNames } from '../../utils/styles';
import { useUser } from '../../contexts/UserContext';

export const LeafIcon: new ({ iconUrl }: { iconUrl: string }) => leaflet.Icon =
  leaflet.Icon.extend({
    options: {
      iconSize: [32, 32],
      tooltipAnchor: [0, -20],
    },
  });

function useLayerGroups({
  leafletMap,
  markers,
  filters,
  onMarkerClick,
}: {
  leafletMap: leaflet.Map | null;
  markers: Marker[];
  filters: string[];
  onMarkerClick?: (marker: Marker) => void;
}): void {
  const user = useUser();
  const layerGroupByFilterRef = useRef<{
    [filterType: string]: leaflet.LayerGroup;
  }>({});

  const hiddenMarkerIds = user?.hiddenMarkerIds || [];
  const visibleMarkers = filters.includes('hidden')
    ? markers
    : markers.filter((marker) => !hiddenMarkerIds.includes(marker._id));

  useEffect(() => {
    if (!leafletMap || !leafletMap.getPane('mapPane') || !markers.length) {
      return;
    }

    Object.entries(layerGroupByFilterRef.current).forEach(
      ([filterType, layerGroup]) => {
        if (!filters.includes(filterType)) {
          leafletMap.removeLayer(layerGroup);
          delete layerGroupByFilterRef.current[filterType];
        }
      }
    );

    filters.forEach((filter) => {
      const mapFilter = mapFilters.find(
        (mapFilter) => mapFilter.type === filter
      );
      if (!mapFilter) {
        return;
      }
      const markersOfType = visibleMarkers.filter(
        (marker) =>
          marker.type === mapFilter.type &&
          (!hiddenMarkerIds.includes(marker._id) || filters.includes('hidden'))
      );

      const existingLayerGroup = layerGroupByFilterRef.current[mapFilter.type];
      if (existingLayerGroup) {
        if (existingLayerGroup.getLayers().length === markersOfType.length) {
          return;
        }
        leafletMap.removeLayer(existingLayerGroup);
      }
      const icon = new LeafIcon({ iconUrl: mapFilter.iconUrl });
      icon.options.className = `leaflet-marker-${mapFilter.category}`;
      const layerGroup = leaflet.markerClusterGroup({
        iconCreateFunction: () => icon,
        disableClusteringAtZoom: mapFilter.isArea ? 0 : 5,
      });

      layerGroup
        .on('clustermouseover', (event) => {
          event.propagatedFrom
            .bindTooltip(
              `${event.propagatedFrom.getChildCount()} ${mapFilter.title}`,
              {
                direction: 'top',
                sticky: true,
              }
            )
            .openTooltip();
        })
        .on('clustermouseout', (event) => {
          event.propagatedFrom.unbindTooltip();
        });
      layerGroup.addTo(leafletMap);

      markersOfType.forEach((markerOfType) => {
        if (markerOfType.position) {
          const marker = leaflet
            .marker([markerOfType.position[1], markerOfType.position[0]], {
              icon,
              pmIgnore: true,
            })
            .bindTooltip(getTooltipContent(markerOfType, mapFilter), {
              direction: 'top',
            });
          if (onMarkerClick) {
            marker.on('click', () => {
              onMarkerClick(markerOfType);
            });
          }
          layerGroup.addLayer(marker);
        } else if (markerOfType.positions) {
          const polygon = leaflet.polygon(
            markerOfType.positions.map((position) => [position[1], position[0]])
          );

          layerGroup.addLayer(polygon);
          const text = leaflet.divIcon({
            className: classNames(
              'leaflet-polygon-text',
              `leaflet-polygon-text-${leafletMap.getZoom()}`
            ),
            html: `${markerOfType.name}<br/>(${markerOfType.levelRange?.join(
              '-'
            )})`,
          });
          const textMarker = leaflet.marker(polygon.getCenter(), {
            icon: text,
          });

          leafletMap.on('zoomend', () => {
            const element = textMarker.getElement();
            if (element) {
              element.className = classNames(
                'leaflet-polygon-text',
                `leaflet-polygon-text-${leafletMap.getZoom()}`
              );
            }
          });
          layerGroup.addLayer(textMarker);
          if (onMarkerClick) {
            polygon.on('click', () => {
              onMarkerClick(markerOfType);
            });
          }
        }
      });

      layerGroupByFilterRef.current[mapFilter.type] = layerGroup;
    });
  }, [filters, leafletMap, visibleMarkers]);
}

export default useLayerGroups;
