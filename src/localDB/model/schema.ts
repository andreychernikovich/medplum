import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 3,
  tables: [
    tableSchema({
      name: 'observations',
      columns: [
        { name: 'created_at', type: 'number'},
        { name: 'body', type: 'string'},
      ]
    }),
  ]
})