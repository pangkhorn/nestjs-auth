import { map, snakeCase } from 'lodash';

export const fromPaginate = (params: {
  page: number | string | any;
  size: number | string | any;
}): { skip: number; take: number; page: number; size: number } => {
  const { page, size } = params;
  return {
    skip: (+size || 25) * ((+page || 1) - 1),
    take: +size || 25,
    page: +page || 1,
    size: +size || 25
  };
};

export const fromOrder = (
  sort: string,
  opt?: {
    defaultSort?: string;
    defaultOrder?: 'ASC' | 'DESC';
    allowFieldSorts?: string[];
    useSnakeCase?: boolean;
    prefixSortBy?: string;
  }
): { sortBy: string; orderBy: 'ASC' | 'DESC' } => {
  const {
    defaultSort = 'id',
    allowFieldSorts = ['id'],
    defaultOrder = 'ASC',
    useSnakeCase = false,
    prefixSortBy = ''
  } = opt;
  const enableSortFields = useSnakeCase ? map(allowFieldSorts, (f) => snakeCase(f)) : allowFieldSorts;
  let [sortBy = defaultSort, orderBy = defaultOrder] = sort?.split(':') || [];
  orderBy = orderBy?.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
  if (!enableSortFields.includes(sortBy)) {
    sortBy = useSnakeCase ? snakeCase(defaultSort) : defaultSort;
    orderBy = defaultOrder;
  }
  return { sortBy: `${prefixSortBy}${sortBy}`, orderBy: orderBy?.toLowerCase() === 'asc' ? 'ASC' : 'DESC' };
};
