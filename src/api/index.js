import { Libby } from './api';

const api = new Libby();
export const loadEntries = api.loadEntries;
export const getMetadata = api.getMetadata;
export const getEntry = api.getEntry;
export const add = api.add;
export const it = api.add;
export const describe = api.describe;
