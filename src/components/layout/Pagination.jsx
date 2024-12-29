import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const Pagination = ({
  count,
  page: _page = 1,
  limit: _limit = 5,
  pageParam = 'page',
  limitParam = 'limit',
  limitOptions = [5, 10, 20]
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get(pageParam)) || _page;
  const limit = Number(searchParams.get(limitParam)) || _limit;
  const pageCount = Math.ceil(count / limit);

  const getUrl = (params) => {
    const url = new URL(window.location.href);
    'page' in params && pageParam && url.searchParams.set(pageParam, params.page);
    'limit' in params && limitParam && url.searchParams.set(limitParam, params.limit);
    return url.pathname + url.search;
  };

  return (
    <div>
      {limitOptions.length > 1 && (
        <select value={limit} onChange={(e) => navigate(getUrl({ limit: e.target.value, page: 1 }))}>
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
  );
};

export default Pagination;
