import { useMemo } from 'react';
import EventEmitter from 'events';

const emitter = new EventEmitter();
const emit = emitter.emit;
const on = emitter.on;

class PageBus extends EventEmitter {
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

export function createBus() {
  let id = new Date().getTime();

  if (window.parent && window.parent.document) {
    // Inside preview iframe, use parent windows ID
    const syncElem = window.parent.document.getElementById('sync_id');
    id = syncElem ? syncElem.getAttribute('data-id') : new Date().getTime();
  } else {
    const syncElem = document.getElementById('sync_id');
    id = syncElem ? syncElem.getAttribute('data-id') : new Date().getTime();
  }

  // ID prevents bus events from propagating to new tabs
  return new PageBus(`libby-${id}`);
}

export function useBus() {
  return useMemo(() => {
    return createBus();
  }, []);
}
