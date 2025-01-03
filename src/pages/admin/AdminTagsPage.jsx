import { useMemo, useState } from 'react';
import { Box, Typography, CircularProgress, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import tagService from '../../services/tag.service';
import { useTags } from '../../providers/TagProvider';
import DataTable from '../../components/table/DataTable';
import Input from '../../components/forms/Input';

const TagDialog = ({ open, tag, onClose, onSave, onChange }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>{tag?._id ? 'Edit Tag' : 'Add Tag'}</DialogTitle>
    <DialogContent sx={{ overflow: 'visible' }}>
      <Input
        type="string"
        label="Tag Name"
        value={tag?.name || ''}
        onChange={(value) => onChange({ ...tag, name: value })}
        fullWidth
      />
    </DialogContent>
    <DialogActions>
      <Button
        variant="outlined"
        onClick={onClose}
        sx={{ borderRadius: 2 }}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={onSave}
        sx={{ borderRadius: 2 }}
      >
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

const AdminTagsPage = () => {
  const { tags, setTags, isLoadingTags } = useTags();
  const [edit, setEdit] = useState(null);

  const handleEdit = async () => {
    const res = await tagService.save(edit);
    setTags(edit._id ? tags.map((tag) => (tag._id === res._id ? res : tag)) : [...tags, res]);
    setEdit(null);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete tag?')) return;
    await tagService.delete(id);
    setTags(tags.filter(({ _id }) => _id !== id));
  };

  const columns = useMemo(() => [
    { name: 'name', label: 'Tag', sortable: true, primary: true },
    { name: 'slug', label: 'Slug', sortable: true },
    {
      name: 'createdAt',
      label: 'Created',
      sortable: true,
      parse: (row) => new Date(row.createdAt).toLocaleDateString()
    },
    {
      name: 'actions',
      parse: (row) => (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => setEdit(row)}
            sx={{ borderRadius: 2 }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(row._id)}
            sx={{ borderRadius: 2 }}
          >
            Delete
          </Button>
        </Box>
      )
    }
  ], [tags]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 600, letterSpacing: -1 }}>
          Tags
        </Typography>
        <Typography variant="h6" component="p" sx={{ color: 'text.medium', maxWidth: 800 }}>
          Manage tags to organize and filter content effectively on your platform.
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setEdit({ name: '' })}
        sx={{ alignSelf: 'flex-start', borderRadius: 2 }}
      >
        Add Tag
      </Button>
      {isLoadingTags ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <DataTable columns={columns} rows={tags} count={tags.length} />
      )}
      <TagDialog
        open={!!edit}
        tag={edit}
        onClose={() => setEdit(null)}
        onSave={handleEdit}
        onChange={setEdit}
      />
    </Box>
  );
};

export default AdminTagsPage;
