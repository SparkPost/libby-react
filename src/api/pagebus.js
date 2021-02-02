import createBus from 'page-bus';

export default function (id) {
  const bus = createBus(`libby-react-${id}`);
  bus.setMaxListeners(100);
  return bus;
}
