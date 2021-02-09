/**
 * Creates a closure for your entries. Can be nested.
 * @param kind The category name
 * @param cb Callback function
 */
export function describe(kind: string, cb: () => void): void;

/**
 * Creates a libby entry
 * @param title Title of the entry
 * @param render Renders your React code
 */
export function add(title: string, render: () => void): void;

/**
 * Creates a libby entry
 * @param title Title of the entry
 * @param render Renders your React code
 */
export function it(title: string, render: () => void): void;
