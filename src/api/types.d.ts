/**
 * Creates a closure for your entries. Can be nested.
 */
export function describe(category: string, callback: () => void): void;

/**
 * Creates a libby entry
 */
export function add(title: string, render: () => ReactNode): void;

/**
 * Creates a libby entry
 */
export function it(title: string, render: () => ReactNode): void;

export type Config = {
  /**
   * Reference to your entries, imported with a `require.context` function
   * @see https://webpack.js.org/api/module-methods/#requirecontext
   * @example entries: () => require.context('./src', true, /\.libby\.jsx$/),
   */
  entries: () => RequireContext;
  /**
   * Page title
   * @default 'Libby'
   */
  title?: string;

  /**
   * Specifies the port for the dev server
   * @default 9000
   */
  port?: number;

  /**
   * Output path for the build
   * @default 'dist/libby'
   */
  outputPath?: string;

  /**
   * Opens the browser when running the dev server
   */
  openBrowser?: boolean;

  /**
   * Path to any JS you want to run before entries are mounted
   * A function must be the default export
   */
  preview?: string;

  /**
   * Path to a custom wrapper for all entries
   * A react component must be the default export
   */
  layout?: string;

  /**
   * Array of background colors for your stories
   */
  backgrounds?: Array<string>;

  /**
   * Custom webpack config
   */
  webpack?: ({ mode }: { mode: 'production' | 'development' }) => Configuration;
};
