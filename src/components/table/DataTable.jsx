import { useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
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

function getSorting(sortBy, sortDesc) {
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
  const pageCount = Math.ceil(count / limit);
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
      return _rows.sort(getSorting(sortBy, sortDesc)).slice(skip, skip + limit);
    }

    return _rows;
  }, [_rows, count, sort, skip, limit]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={col.name ?? i}>
                {col.sortable ? (
                  <Link to={getUrl({ sort: col.name === sortBy && !sortDesc ? `-${col.name}` : col.name })}>
                    {col.label}
                    {col.name === sortBy && (sortDesc ? '↓' : '↑')}
                  </Link>
                ) : (
                  col.label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row._id ?? i}>
              {columns.map((col, j) => (
                <td key={col.name ?? j}>
                  {parse(row, col)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {limitOptions.length > 1 && (
          <select value={limit} onChange={(e) => navigate(getUrl({ limit: e.target.value }))}>
            {limitOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        )}
        {pageCount > 1 && (
          <div>
            {[...Array(pageCount)].map((_, i) => (
              i + 1 === page ? i + 1 : (
                <Link to={getUrl({ page: i + 1 })} key={i}>
                  {i + 1}
                </Link>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
