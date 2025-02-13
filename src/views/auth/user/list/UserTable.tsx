// UserTable.tsx
import { useState } from 'react'

import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel, getFacetedRowModel, getFacetedUniqueValues, getFacetedMinMaxValues } from '@tanstack/react-table'

import { userColumns } from './UserColumns'
import type { UsersTypeWithAction } from '@/types/apps/userTypes'
import { fuzzyFilter } from './fuzzyFilter'

export const useUserTable = (data: UsersTypeWithAction[], locale: Locale) => {
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data,
    columns: userColumns(locale),
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true,
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  return { table, globalFilter, setGlobalFilter }
}
