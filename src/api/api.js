import { createPageBus } from '../hooks/useBus';

function slug(str) {
  return str.replace(/[^a-zA-Z0-9]+/g, '-');
}

function makeKey(name, kind) {
  return `${slug(kind)}__${slug(name)}`;
}

// Pulls a unique id from the parent window to namespace the event emitter
// See: src/ui/index.jsasdfddd
const syncElem = window.parent.document.getElementById('sync_id');
const bus = createPageBus(
  syncElem ? syncElem.getAttribute('data-id') : new Date().getTime()
);

class Libby {
  constructor() {
    if (!!Libby.instance) {
      return Libby.instance;
    }

    this.source = [];
    this.formatted = {};
    this.kind = 'root';

    Libby.instance = this;
    return this;
  }

  loadEntries = async () => {
    try {
      console.log('[libby] Loading entries...');

      const entries = import.meta.importGlob(
        [
          '__LIBBY_CWD__/**/*.libby.{jsx,js,tsx,ts}',
          '!**/node_modules/**',
          '!**/dist/**',
          '!**/__tests__/**'
        ],
        { exhaustive: true } // includes dot files/directories
      );

      for (const entry in entries) {
        await entries[entry]();
      }

      console.log(
        !entries
          ? '[libby] No entries found.'
          : `[libby] Loaded ${Object.keys(entries).length} entries.`
      );
    } catch (e) {
      console.error('[libby] Error importing entries.');
      console.error(e);
    }

    return;
  };

  add = (name, render) => {
    if (!name || !render) {
      return;
    }

    this.source.push({
      kind: this.kind,
      key: makeKey(name, this.kind),
      name,
      render
    });
  };

  describe = (kind, callback) => {
    this.kind =
      this.kind && this.kind !== 'root'
        ? `${this.kind}__${kind}`
        : kind;
    callback();

    const parts = this.kind.split('__');

    if (parts.length > 1) {
      parts.pop();
      const backKind = parts.join('__');
      this.kind = backKind;
    } else {
      this.kind = 'root';
    }
  };

  getEntry = (requestedKey) => {
    const entry = this.source.filter(
      ({ key }) => requestedKey === key
    );

    if (entry.length) {
      return entry[0];
    }

    return null;
  };

  _sort = () => {
    const source = this.source;
    function lower(str) {
      return str.toLowerCase();
    }
    source.sort((a, b) =>
      lower(a.kind) < lower(b.kind)
        ? -1
        : lower(a.kind) > lower(b.kind)
        ? 1
        : 0
    );
    return source;
  };

  getMetadata = () => {
    const source = this._sort();
    const withoutRender = source.map(({ render, ...entry }) => entry);

    function expand(acc, item) {
      const parts = item.kind.split('__');

      if (parts.length === 1) {
        const kind = parts[0];
        return {
          ...acc,
          [kind]: {
            entries: [
              ...(acc[kind]?.entries ? acc[kind].entries : []),
              item
            ]
          }
        };
      }

      if (parts.length > 1) {
        const newRoot = parts.shift();
        const newKind = parts.join('__');
        const kinds =
          acc[newRoot] && acc[newRoot].kinds
            ? acc[newRoot].kinds
            : {};

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
  };
}

const api = new Libby();

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    // Forces preview to reload when it is updated
    // This HMR boundary is here to prevent the parent UI from refreshing
    window.location.reload();
  });
}

export { api, bus };
