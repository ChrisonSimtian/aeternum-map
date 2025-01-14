import type { FilterItem } from './mapFilters';

export function searchMapFilter(
  search: string
): (mapFilter: FilterItem) => boolean {
  const regExp = new RegExp(search, 'i');
  return (mapFilter: FilterItem) => Boolean(mapFilter.title.match(regExp));
}
