import { useEffect, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper } from '@mui/material';
import Pagination from '../layout/Pagination';
import { isDate } from '../../utils/string.utils';

function parse(row, col) {
  if (col.parse) return col.parse(row);

  const value = row[col.name];

  if (isDate(value)) {
    return new Date(value).toLocaleDateString();
  }

  if (typeof value === 'number') {
    return value.toLocaleString();
  }

  return value;
}

function getSorting(sortBy, sortDesc, columns) {
  const column = columns.find(col => col.name === sortBy);

  if (column?.sort) {
    return column.sort(sortDesc);
  }

  return (a, b) => {
    a = a[sortBy];
    b = b[sortBy];

    if (typeof a === 'string') {
      return (sortDesc ? -1 : 1) * a.localeCompare(b);
    }

    if (typeof a === 'number') {
      return (sortDesc ? -1 : 1) * (a - b);
    }

    return 0;
  };
}

const DataTable = ({
  columns,
  rows: _rows,
  count = _rows.length,
  sort: _sort = columns.find(({ name }) => name)?.name,
  page: _page = 1,
  limit: _limit = 5,
  sortParam = 'sort',
  pageParam = 'page',
  limitParam = 'limit',
  limitOptions = [5, 10, 20]
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get(sortParam) || _sort;
  const page = Number(searchParams.get(pageParam)) || _page;
  const limit = Number(searchParams.get(limitParam)) || _limit;
  const sortDesc = sort.startsWith('-');
  const sortBy = sortDesc ? sort.substring(1) : sort;
  const skip = (page - 1) * limit;

  const getUrl = (params) => {
    const url = new URL(window.location.href);
    'sort' in params && sortParam && url.searchParams.set(sortParam, params.sort);
    'page' in params && pageParam && url.searchParams.set(pageParam, params.page);
    'limit' in params && limitParam && url.searchParams.set(limitParam, params.limit);
    return url.pathname + url.search;
  };

  const rows = useMemo(() => {
    if (_rows.length === count) {
      return _rows.sort(getSorting(sortBy, sortDesc, columns)).slice(skip, skip + limit);
    }
    return _rows;
  }, [_rows, count, sort, skip, limit, columns]);

  useEffect(() => {
    if (/*!isLoading && */!rows.length && page > 1) {
      navigate(getUrl({ page: page - 1 }), { replace: true });
    }
  }, [rows]);

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col, i) => (
                <TableCell key={col.name ?? i} sortDirection={col.name === sortBy ? (sortDesc ? 'desc' : 'asc') : false}>
                  {col.sortable ? (
                    <Link
                      to={getUrl({ sort: col.name === sortBy && !sortDesc ? `-${col.name}` : col.name })}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <TableSortLabel
                        active={col.name === sortBy}
                        direction={sortDesc ? 'desc' : 'asc'}
                      >
                        {col.label}
                      </TableSortLabel>
                    </Link>
                  ) : (
                    col.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={row._id ?? i}>
                {columns.map((col, j) => (
                  <TableCell key={col.name ?? j}>
                    {parse(row, col)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={count} limitOptions={limitOptions} />
    </Box>
  );
};

export default DataTable;
