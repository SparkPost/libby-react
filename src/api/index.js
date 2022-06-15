import { Libby } from './api';
import { createBus } from './bus';

const apiBus = createBus();
const api = new Libby();

export const getMetadata = api.getMetadata;
export const getEntry = api.getEntry;
export const add = api.add;
export const it = api.add;
export const describe = api.describe;
export const bus = apiBus;

api.loadEntries();
