import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Pagination as MuiPagination, PaginationItem, Select, MenuItem, Box } from '@mui/material';

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
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0' }}>
      {limitOptions.length > 1 && (
        <Select
          value={limit}
          onChange={(e) => navigate(getUrl({ limit: e.target.value, page: 1 }))}
          size="small"
        >
          {limitOptions.map((option) => (
            <MenuItem value={option} key={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      )}
      {pageCount > 1 && (
        <MuiPagination
          count={pageCount}
          page={page}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={getUrl({ page: item.page })}
              {...item}
            />
          )}
        />
      )}
    </Box>
  );
};

export default Pagination;
