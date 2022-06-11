import { Libby } from './api';

export const api = new Libby();
export const add = api.add.bind(api);
export const it = api.add.bind(api);
export const describe = api.describe.bind(api);
