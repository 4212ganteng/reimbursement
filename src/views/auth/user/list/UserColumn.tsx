// UserColumns.tsx
import Link from 'next/link'

import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'

import { Checkbox, Typography, Chip, IconButton } from '@mui/material'

import type { Locale } from '@configs/i18n'


import { getLocalizedUrl } from '@/utils/i18n'


import { getInitials } from '@/utils/getInitials'
import CustomAvatar from '@core/components/mui/Avatar'
import OptionMenu from '@core/components/option-menu'
import type { UsersType } from '@/types/userTypes'


const columnHelper = createColumnHelper<UsersTypeWithAction>()


type UsersTypeWithAction = UsersType & {
  action?: string
}

const userRoleObj = {
  admin: { icon: 'tabler-crown', color: 'error' },
  author: { icon: 'tabler-device-desktop', color: 'warning' },
  editor: { icon: 'tabler-edit', color: 'info' },
  maintainer: { icon: 'tabler-chart-pie', color: 'success' },
  subscriber: { icon: 'tabler-user', color: 'primary' }
}

const userStatusObj = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

const getAvatar = (params: { avatar?: string; fullName: string }) => {
  const { avatar, fullName } = params

  if (avatar) {
    return <CustomAvatar src={avatar} size={34} />
  } else {
    return <CustomAvatar size={34}>{getInitials(fullName)}</CustomAvatar>
  }
}

export const userColumns = (locale: Locale): ColumnDef<UsersTypeWithAction, any>[] => [
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
  columnHelper.accessor('fullName', {
    header: 'User',
    cell: ({ row }) => (
      <div className='flex items-center gap-4'>
        {getAvatar({ avatar: row.original.avatar, fullName: row.original.fullName })}
        <div className='flex flex-col'>
          <Typography color='text.primary' className='font-medium'>
            {row.original.fullName}
          </Typography>
          <Typography variant='body2'>{row.original.username}</Typography>
        </div>
      </div>
    )
  }),
  columnHelper.accessor('role', {
    header: 'Role',
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <i
          className={userRoleObj[row.original.role].icon}
          style={{ color: `var(--mui-palette-${userRoleObj[row.original.role].color}-main)` }}
        />
        <Typography className='capitalize' color='text.primary'>
          {row.original.role}
        </Typography>
      </div>
    )
  }),
  columnHelper.accessor('currentPlan', {
    header: 'Plan',
    cell: ({ row }) => (
      <Typography className='capitalize' color='text.primary'>
        {row.original.currentPlan}
      </Typography>
    )
  }),
  columnHelper.accessor('billing', {
    header: 'Billing',
    cell: ({ row }) => <Typography>{row.original.billing}</Typography>
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: ({ row }) => (
      <div className='flex items-center gap-3'>
        <Chip
          variant='tonal'
          label={row.original.status}
          size='small'
          color={userStatusObj[row.original.status]}
          className='capitalize'
        />
      </div>
    )
  }),
  columnHelper.accessor('action', {
    header: 'Action',
    cell: ({ row }) => (
      <div className='flex items-center'>
        <IconButton onClick={() => console.log('Delete user', row.original.id)}>
          <i className='tabler-trash text-textSecondary' />
        </IconButton>
        <IconButton>
          <Link href={getLocalizedUrl('/apps/user/view', locale)} className='flex'>
            <i className='tabler-eye text-textSecondary' />
          </Link>
        </IconButton>
        <OptionMenu
          iconButtonProps={{ size: 'medium' }}
          iconClassName='text-textSecondary'
          options={[
            {
              text: 'Download',
              icon: 'tabler-download',
              menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
            },
            {
              text: 'Edit',
              icon: 'tabler-edit',
              menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
            }
          ]}
        />
      </div>
    ),
    enableSorting: false
  })
]
