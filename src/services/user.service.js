import ModelService from './ModelService';
import useModelService from '../hooks/useModelService';

class UserService extends ModelService {
  constructor() {
    super('/api/users');
  }
}

const userService = new UserService();

export const { useUser, useUsers } = useModelService(userService, { name: 'user' });

export default userService;
