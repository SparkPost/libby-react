import { Libby } from './api';
import config from '__LIBBY_CONFIG__';

export const api = new Libby();
export const add = api.add.bind(api);
export const it = api.add.bind(api);
export const describe = api.describe.bind(api);

api.configure(config.entries());
