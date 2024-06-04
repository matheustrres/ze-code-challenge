import { resolve } from 'node:path';

import { addAlias } from 'module-alias';

const isDevMode = process.env['NODE_ENV'] === 'development';

addAlias('@/', resolve(isDevMode ? 'dist' : 'src'));
