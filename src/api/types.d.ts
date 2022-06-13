import type { ReactNode } from 'react';

/**
 * Creates a closure and folder for your entries. Can be nested.
 */
declare function describe(kind: string, callback: () => void): void;

/**
 * Creates a libby entry
 */
declare function add(title: string, render: () => ReactNode): void;

/**
 * Creates a libby entry
 */
declare function it(title: string, render: () => ReactNode): void;
