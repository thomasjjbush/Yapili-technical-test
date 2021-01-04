import { FC, lazy as lazyImport, LazyExoticComponent } from 'react';

export const lazy = (module: Promise<Record<string, FC>>, moduleName: string): LazyExoticComponent<FC> =>
    lazyImport(() => module.then((module) => ({ default: module[moduleName] })));
