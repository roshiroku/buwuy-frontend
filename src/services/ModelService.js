import { toFormData } from 'axios';
import axios from '../api/axios.js';

export default class Service {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async find(params) {
    const { data } = await axios.get(this.baseUrl, { params });
    return data;
  }

  async get(id) {
    const { data } = await axios.get(this.baseUrl + `/${id}`);
    return data;
  }

  async save(model) {
    let res;

    if (model._id) {
      res = await axios.put(this.baseUrl + `/${model._id}`, toFormData(model));
    } else {
      res = await axios.post(this.baseUrl, toFormData(model));
    }

    return res.data;
  }

  async delete(id) {
    const { data } = await axios.delete(this.baseUrl + `/${id}`);
    return data;
  }
}
