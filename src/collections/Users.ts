import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    components: {
      beforeListTable: [
        {
          path: 'src/components/Users/BeforeList.tsx',
        },
      ],
      // beforeList: [
      //   {
      //     path: 'src/components/Users/BeforeList.tsx',
      //   },
      // ],
    },
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'team',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      options: ['admin', 'user'],
    },
  ],
}
