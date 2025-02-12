// ProductColumn.tsx
import type { ColumnDef } from '@tanstack/react-table'

import { Checkbox, Typography } from '@mui/material'

import type { ProductRes } from '@/types/apps/productTypes'

const columnHelper = createColumnHelper<ProductRes>()
export const productColumns: ColumnDef<ProductRes, any>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler()
        }}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        {...{
          checked: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          indeterminate: row.getIsSomeSelected(),
          onChange: row.getToggleSelectedHandler()
        }}
      />
    )
  },
  columnHelper.accessor('name', {
    header: 'Product',
    cell: ({ row }) => (
      <div className='flex items-center gap-4'>
        <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${row.original?.image}`} width={38} height={38} className='rounded bg-actionHover' />
        <div className='flex flex-col'>
          <Typography className='font-medium' color='text.primary'>
            {row.original.name}
          </Typography>
          <Typography variant='body2'>{row.original.description}</Typography>
        </div>
      </div>
    )
  }),
  columnHelper.accessor('sku', {
    header: 'SKU',
    cell: ({ row }) => <Typography>{row.original.sku}</Typography>
  }),
  columnHelper.accessor('categoryId', {
    header: 'Category',
    cell: ({ row }) => (
      <Typography color='text.primary'>{row.original.category.category}</Typography>
    )
  }),
  columnHelper.accessor('unitId', {
    header: 'Unit',
    cell: ({ row }) => <Typography>{row.original.unit.unit}</Typography>
  }),
  columnHelper.accessor('minStockThreshold', {
    header: 'Minimal Stock',
    cell: ({ row }) => <Typography>{row.original.minStockThreshold}</Typography>
  }),
  columnHelper.accessor('id', {
    header: 'Actions',
    cell: ({ row }) => (
      <div className='flex items-center'>
        <IconButton>
          <i className='tabler-edit text-textSecondary' />
        </IconButton>
        <OptionMenu
          iconButtonProps={{ size: 'medium' }}
          iconClassName='text-textSecondary'
          options={[
            { text: 'Download', icon: 'tabler-download' },
            {
              text: 'Delete',
              icon: 'tabler-trash',
              menuItemProps: { onClick: () => row.original.id }
            },
            { text: 'Duplicate', icon: 'tabler-copy' }
          ]}
        />
      </div>
    ),
    enableSorting: false
  })
]
