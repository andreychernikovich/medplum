import { schemaMigrations, createTable } from '@nozbe/watermelondb/Schema/migrations'

export default schemaMigrations({
    migrations: [
    {
      // ⚠️ Set this to a number one larger than the current schema version
      toVersion: 3,
      steps: [
        // See "Migrations API" for more details
      ],
    },
  ],
})