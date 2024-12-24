import { useState } from 'react';
import tagService from '../../services/tag.service';
import { useTags } from '../../providers/TagProvider';
import DataTable from '../../components/table/DataTable';

const AdminTagsPage = () => {
  const { tags, setTags, isLoadingTags } = useTags();
  const [edit, setEdit] = useState();

  const columns = [
    { name: 'name', label: 'Tag', sortable: true },
    { name: 'slug', label: 'Slug', sortable: true },
    { name: 'createdAt', label: 'Created', sortable: true },
    {
      name: 'actions',
      parse: (tag) => (
        <div>
          <button onClick={() => setEdit(tag)}>edit</button>
          <button onClick={() => handleDelete(tag._id)}>delete</button>
        </div>
      )
    }
  ];

  const handleEdit = async () => {
    const res = await tagService.save(edit);
    setTags(edit._id ? tags.map((tag) => {
      return tag._id === res._id ? res : tag;
    }) : [...tags, res]);
    setEdit(null);
  };

  const handleDelete = async (id) => {
    if (!confirm('delete tag?')) return;
    await tagService.delete(id);
    setTags(tags.filter(({ _id }) => _id !== id));
  };

  return (
    <div>
      {edit && (
        <div>
          <input type="text" value={edit.name} onInput={(e) => setEdit({ ...edit, name: e.target.value })} />
          <button onClick={() => setEdit(null)}>Cancel</button>
          <button onClick={handleEdit}>Save</button>
        </div>
      )}
      <button onClick={() => setEdit({ name: 'New Tag' })}>Add Tag</button>
      <DataTable columns={columns} rows={tags} />
    </div>
  );
};

export default AdminTagsPage;
