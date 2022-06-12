import EventEmitter from 'events';

const emitter = new EventEmitter();
const emit = emitter.emit;
const on = emitter.on;

export default class PageBus extends EventEmitter {
  constructor(id = 'page-bus') {
    super();

    if (!(this instanceof PageBus)) {
      return new PageBus(id);
    }

    const self = this;
    EventEmitter.call(this);

    this._key = id || 'page-bus';

    window.addEventListener('storage', function (ev) {
      if (ev.key === self._key) {
        try {
          var value = JSON.parse(ev.newValue);
        } catch (err) {
          return;
        }
        if (Array.isArray(value)) {
          emit.apply(self, value);
        }
      }
    });
  }

  on(name, f) {
    on.apply(this, arguments);
  }

  emit(name) {
    emit.apply(this, arguments);
    var args = [].slice.call(arguments);
    localStorage.setItem(this._key, JSON.stringify(args));
    return this;
  }
}
