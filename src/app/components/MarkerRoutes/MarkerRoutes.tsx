import { useEffect, useMemo } from 'react';
import { useFilters } from '../../contexts/FiltersContext';
import { useMarkers } from '../../contexts/MarkersContext';
import type { Position } from '../../contexts/PositionContext';
import { usePosition } from '../../contexts/PositionContext';
import type { AccountDTO } from '../../contexts/UserContext';
import { useAccount } from '../../contexts/UserContext';
import { writeError } from '../../utils/logs';
import { notify } from '../../utils/notifications';
import { calcDistance } from '../../utils/positions';
import { usePersistentState } from '../../utils/storage';
import ActionButton from '../ActionControl/ActionButton';
import { mapFilters } from '../MapFilter/mapFilters';
import SearchInput from '../SearchInput/SearchInput';
import { deleteMarkerRoute, patchFavoriteMarkerRoute } from './api';
import MarkerRoute from './MarkerRoute';
import styles from './MarkerRoutes.module.css';

export type MarkerRouteItem = {
  _id: string;
  name: string;
  userId: string;
  username: string;
  isPublic: boolean;
  positions: [number, number][];
  markersByType: {
    [type: string]: number;
  };
  favorites?: number;
  createdAt: string;
};

type SortBy = 'match' | 'favorites' | 'distance' | 'date' | 'name' | 'username';
type Filter = 'all' | 'myRoutes' | 'favorites';

function handleFilter(
  filter: Filter,
  search: string,
  account: AccountDTO | null
) {
  const regExp = new RegExp(search, 'i');
  const filterBySearch = (item: MarkerRouteItem) => {
    if (search === '') {
      return true;
    }
    const matchedMarkersType = Object.keys(item.markersByType).some((type) => {
      const mapFilter = mapFilters.find((filter) => filter.type === type);
      if (!mapFilter) {
        return false;
      }
      return mapFilter.title.match(regExp);
    });
    return matchedMarkersType || item.name.match(regExp);
  };
  if (filter === 'favorites') {
    return (item: MarkerRouteItem) =>
      account?.favoriteRouteIds?.includes(item._id) && filterBySearch(item);
  }
  if (filter === 'myRoutes') {
    return (item: MarkerRouteItem) =>
      item.userId === account?.steamId && filterBySearch(item);
  }
  return (item: MarkerRouteItem) => filterBySearch(item);
}

function handleSort(sortBy: SortBy, filters: string[], position: Position) {
  if (sortBy === 'favorites') {
    return (a: MarkerRouteItem, b: MarkerRouteItem) =>
      (b.favorites || 0) - (a.favorites || 0);
  }
  if (sortBy === 'date') {
    return (a: MarkerRouteItem, b: MarkerRouteItem) =>
      b.createdAt.localeCompare(a.createdAt);
  }
  if (sortBy === 'distance') {
    return (a: MarkerRouteItem, b: MarkerRouteItem) =>
      calcDistance(position.location, a.positions[0]) -
      calcDistance(position.location, b.positions[0]);
  }
  if (sortBy === 'name') {
    return (a: MarkerRouteItem, b: MarkerRouteItem) =>
      a.name.localeCompare(b.name);
  }
  if (sortBy === 'username') {
    return (a: MarkerRouteItem, b: MarkerRouteItem) =>
      a.username.localeCompare(b.username);
  }
  return (a: MarkerRouteItem, b: MarkerRouteItem) => {
    const typesA = Object.keys(a.markersByType);
    const typesB = Object.keys(b.markersByType);
    const matchA =
      typesA.length / typesA.filter((type) => filters.includes(type)).length;
    const matchB =
      typesB.length / typesB.filter((type) => filters.includes(type)).length;
    return matchA - matchB;
  };
}

type MarkerRoutesProps = {
  editing: boolean;
  onEdit: (target: MarkerRouteItem | boolean) => void;
};
function MarkerRoutes({ editing, onEdit }: MarkerRoutesProps): JSX.Element {
  const {
    markerRoutes,
    clearMarkerRoutes,
    toggleMarkerRoute,
    refreshMarkerRoutes,
    allMarkerRoutes,
  } = useMarkers();
  const { account, refreshAccount } = useAccount();
  const [sortBy, setSortBy] = usePersistentState<SortBy>(
    'markerRoutesSort',
    'match'
  );
  const [filter, setFilter] = usePersistentState<Filter>(
    'markerRoutesFilter',
    'all'
  );
  const [search, setSearch] = usePersistentState('searchRoutes', '');
  const [filters, setFilters] = useFilters();
  const { position } = usePosition();

  useEffect(() => {
    refreshMarkerRoutes();
  }, []);

  async function handleRemove(markerRouteId: string): Promise<void> {
    if (!account) {
      return;
    }
    try {
      await notify(deleteMarkerRoute(markerRouteId), {
        success: 'Route deleted 👌',
      });

      const markerRoute = markerRoutes.find(
        (markerRoute) => markerRoute._id == markerRouteId
      );
      if (markerRoute) {
        toggleMarkerRoute(markerRoute);
      }

      refreshMarkerRoutes();
    } catch (error) {
      writeError(error);
    }
  }

  async function handleFavorite(markerRouteId: string): Promise<void> {
    if (!account) {
      return;
    }
    const isFavorite = account.favoriteRouteIds?.some(
      (routeId) => markerRouteId === routeId
    );
    try {
      await notify(patchFavoriteMarkerRoute(markerRouteId, !isFavorite), {
        success: 'Favored route changed 👌',
      });
      refreshAccount();
      refreshMarkerRoutes();
    } catch (error) {
      writeError(error);
    }
  }

  function isEditable(markerRoute: MarkerRouteItem): boolean {
    return Boolean(
      !editing &&
        account &&
        (account.isModerator || account.steamId === markerRoute.userId)
    );
  }

  const sortedMarkerRoutes = useMemo(
    () =>
      allMarkerRoutes
        .filter(handleFilter(filter, search, account))
        .sort(handleSort(sortBy, filters, position)),
    [sortBy, allMarkerRoutes, filters, position, filter, search]
  );

  function handleEdit(markerRoute: MarkerRouteItem) {
    if (
      markerRoutes.some(
        (selectedMarkerRoute) => selectedMarkerRoute.name == markerRoute.name
      )
    ) {
      toggleMarkerRoute(markerRoute);
    }
    const types = Object.keys(markerRoute.markersByType);
    setFilters((filters) => [
      ...filters,
      ...types.filter((type) => !filters.includes(type)),
    ]);
    onEdit(markerRoute);
  }

  return (
    <section className={styles.container}>
      <div className={styles.actions}>
        <ActionButton
          disabled={editing || !account}
          onClick={() => {
            onEdit(true);
          }}
        >
          {account ? 'Add route' : 'Login to add route'}
        </ActionButton>
        <ActionButton onClick={clearMarkerRoutes}>Hide all</ActionButton>
      </div>
      <div className={styles.actions}>
        <SearchInput
          placeholder="Marker or title..."
          value={search}
          onChange={setSearch}
        />
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value as SortBy)}
        >
          <option value="match">By match</option>
          <option value="favorites">By favorites</option>
          <option value="distance">By distance</option>
          <option value="date">By date</option>
          <option value="name">By name</option>
          <option value="username">By username</option>
        </select>
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value as Filter)}
        >
          <option value="all">All</option>
          <option value="favorites">Favorites</option>
          <option value="myRoutes">My routes</option>
        </select>
      </div>
      <div className={styles.items}>
        {sortedMarkerRoutes.map((markerRoute) => (
          <MarkerRoute
            key={markerRoute._id}
            isOwner={markerRoute.userId === account?.steamId}
            markerRoute={markerRoute}
            isPublic={markerRoute.isPublic}
            selected={markerRoutes.some(
              (selectedMarkerRoute) =>
                selectedMarkerRoute._id == markerRoute._id
            )}
            editable={isEditable(markerRoute)}
            onClick={() => toggleMarkerRoute(markerRoute)}
            onRemove={() => handleRemove(markerRoute._id)}
            isFavorite={Boolean(
              account?.favoriteRouteIds?.some(
                (routeId) => markerRoute._id === routeId
              )
            )}
            onFavorite={() => handleFavorite(markerRoute._id)}
            onEdit={() => handleEdit(markerRoute)}
          />
        ))}
      </div>
    </section>
  );
}

export default MarkerRoutes;
