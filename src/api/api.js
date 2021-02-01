import bus from './pagebus';

function removeSpaces(str) {
  return str.split(' ').join('-');
}

function makeKey(name, kind) {
  return `${removeSpaces(kind)}__${removeSpaces(name)}`;
}

export class Libby {
  constructor() {
    this.source = [];
    this.formatted = {};
    this.kind = 'root';
  }

  configure(include) {
    function load(context) {
      const keys = context.keys();

      keys.forEach((key) => {
        context(key);
      });
    }

    load(include);
    this._startEvents();
  }

  add(name, render) {
    if (!name || !render) {
      return;
    }

    this.source.push({
      kind: this.kind,
      key: makeKey(name, this.kind),
      name,
      render
    });
  }

  describe(kind, callback) {
    this.kind = this.kind && this.kind !== 'root' ? `${this.kind}__${kind}` : kind;
    callback();

    const parts = this.kind.split('__');

    if (parts.length > 1) {
      parts.pop();
      const backKind = parts.join('__');
      this.kind = backKind;
    } else {
      this.kind = 'root';
    }
  }

  getEntry(requestedKey) {
    const entry = this.source.filter(({ key }) => requestedKey === key);

    if (entry.length) {
      return entry[0];
    }

    return null;
  }

  _getMetadata() {
    const withoutRender = this.source.map(({ render, ...entry }) => entry);

    function expand(acc, item) {
      const parts = item.kind.split('__');

      if (parts.length === 1) {
        const kind = parts[0];
        return {
          ...acc,
          [kind]: {
            entries: [...(acc[kind] ? acc[kind].entries : []), item]
          }
        };
      }

      if (parts.length > 1) {
        const newRoot = parts.shift();
        const newKind = parts.join('__');
        const kinds = acc[newRoot] && acc[newRoot].kinds ? acc[newRoot].kinds : {};

        return {
          ...acc,
          [newRoot]: {
            ...acc[newRoot],
            kinds: {
              // This is so bad i know
              ...kinds,
              ...expand(kinds, {
                ...item,
                kind: newKind
              })
            }
          }
        };
      }
      return acc;
    }

    return withoutRender.reduce(expand, {});
  }

  _startEvents() {
    bus.emit('set_entries', this._getMetadata());

    bus.on('load_entry', (search) => {
      if (search && window.location.search !== search) {
        window.location.search = search;
      }
    });
  }
}
