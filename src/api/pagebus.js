import createBus from 'page-bus';

const bus = createBus(`libby-react`);
bus.setMaxListeners(100);

export default bus;
