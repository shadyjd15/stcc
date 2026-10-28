import * as migration_20261028_082223_initial from './20261028_082223_initial';

export const migrations = [
  {
    up: migration_20261028_082223_initial.up,
    down: migration_20261028_082223_initial.down,
    name: '20261028_082223_initial'
  },
];
