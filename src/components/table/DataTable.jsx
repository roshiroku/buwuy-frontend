import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";

const DataTable = ({
  columns,
  rows: _rows,
  count = _rows.length,
  sort: _sort = columns.find(({ name }) => name)?.name,
  page: _page = 1,
  limit: _limit = 5,
  sortParam = 'sort',
  pageParam = 'page',
  limitParam = 'limit'
}) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get(sortParam) || _sort;
  const page = searchParams.get(pageParam) || _page;
  const limit = searchParams.get(limitParam) || _limit;
  const pageCount = Math.ceil(count / limit);
  const sortDesc = sort.startsWith('-');
  const sortBy = sortDesc ? sort.substring(1) : sort;
  const skip = (page - 1) * limit;

  const getUrl = (params) => {
    const url = new URL(window.location.href);
    'sort' in params && sortParam && url.searchParams.set(sortParam, params.sort);
    'page' in params && pageParam && url.searchParams.set(pageParam, params.page);
    'limit' in params && limitParam && url.searchParams.set(limitParam, params.limit);
    return url.href;
  };

  const rows = useMemo(() => {
    return [..._rows]
      .sort((a, b) => (sortDesc ? -1 : 1) * a[sortBy].localeCompare(b[sortBy]))
      .slice(skip, skip + limit);
  }, [_rows, sort, skip, limit]);

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
                  {col.parse ? col.parse(row) : row[col.name]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {pageCount > 1 && (
          <div>
            {new Array(pageCount).map((_, i) => (
              <Link to={getUrl({ page: i + 1 })}>{i + 1}</Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
