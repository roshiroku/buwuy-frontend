import { Box, Typography, InputAdornment, Button, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTags } from '../../providers/TagProvider';
import Input from '../forms/Input';
import Autocomplete from '../forms/Autocomplete';

const SearchForm = ({ value, onInput, onChange, tags: _tags }) => {
  const { tags } = useTags();

  const handleSearch = (e) => {
    e.preventDefault();
    onChange({ q: value, page: 1 });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSearch}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { md: 'center' },
        gap: 2
      }}
    >
      {_tags && (
        <>
          <Autocomplete
            value={_tags}
            options={tags.map((tag) => ({ value: tag.slug, label: tag.name }))}
            onChange={(value) => onChange({ tags: value, page: 1 })}
            placeholder="Filter by Tags"
            multiple
            sx={{ flex: 1 }}
          />
          <Typography variant="body1" sx={{ display: { xs: 'none', md: 'block' } }}>
            Or
          </Typography>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 2, alignItems: 'center' }}>
            <Divider sx={{ flexGrow: 1, borderColor: 'background.cardBorder' }} />
            <Typography
              variant="body2"
              sx={{
                color: 'text.faded',
                textTransform: 'uppercase',
                lineHeight: 1
              }}
            >
              Or
            </Typography>
            <Divider sx={{ flexGrow: 1, borderColor: 'background.cardBorder' }} />
          </Box>
        </>
      )}
      <Input
        value={value}
        onChange={(value) => onInput(value)}
        placeholder="Search products..."
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }
        }}
        sx={{ flex: 1 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ borderRadius: 2 }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchForm;
