// eslint-disable-next-line no-undef
const isDev = __LIBBY_IS_DEV__;

function slug(str) {
  return str.replace(/[^a-zA-Z0-9]+/g, '-');
}

function makeKey(name, kind) {
  return `${slug(kind)}__${slug(name)}`;
}

// eslint-disable-next-line no-new-func
// export const dynamicImport = new Function(
//   'file',
//   'return import(file)'
// );

// const loadDev = () => {
//   if (!isDev) {
//     return;
//   }
// };

// const loadProd = async () => {
//   if (isDev) {
//     return;
//   }

//   // See https://github.com/antfu/vite-plugin-glob

// };

export class Libby {
  constructor() {
    this.source = [];
    this.formatted = {};
    this.kind = 'root';
  }

  async configure() {
    console.log(
      `[libby] ${isDev ? 'Development mode.' : 'Production mode.'}`
    );

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

      console.log(entries);

      for (const entry in entries) {
        await entries[entry]();
      }

      console.log(
        !entries
          ? '[libby] No entries found.'
          : `[libby] Loaded ${Object.keys(entries).length} entries.`
      );

      console.log(this.source);
    } catch (e) {
      console.error('[libby] Error importing entries.');
      console.error(e);
    }

    return;
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
  }

  getEntry(requestedKey) {
    const entry = this.source.filter(
      ({ key }) => requestedKey === key
    );

    if (entry.length) {
      return entry[0];
    }

    return null;
  }

  _sort() {
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
  }

  getMetadata() {
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
  }
}
