import Service from './Service';

class TagService extends Service {
  constructor() {
    super('/tags');
  }
}

export default new TagService();
