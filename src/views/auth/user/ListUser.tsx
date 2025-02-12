// ProductListTable.tsx
import { Fragment, useEffect, useMemo, useState } from 'react'

import { Grid, Card, CardHeader, Button, IconButton, MenuItem, Typography, Checkbox } from '@mui/material'

import { UseProduct } from './hooks/useProduct'
import type { ProductRes } from '@/types/apps/productTypes'
import { useProductTable } from './ProductTable'
import { DebouncedInput } from './DebouncedInput'
import { FallbackSpinner } from '@/@core/components/spinner/FallbackSpinner'
import { ProductCard } from './ProductCard'
import { AddProductDrawer } from '../AddProductDrawer'
import { TablePaginationComponent } from '@/components/TablePaginationComponent'
import tableStyles from '@core/styles/table.module.css'

const ProductListTable = () => {
  const { CreateproductwithFile, FetchAllProducts, dataProducts, loading } = UseProduct()
  const [addCategoryOpen, setAddCategoryOpen] = useState(false)
  const { table, globalFilter, setGlobalFilter } = useProductTable(dataProducts as ProductRes[])

  useEffect(() => {
    FetchAllProducts()
  }, [])

  const dataHeader = {
    category: 10,
    entries: 15,
    product: 7,
    unit: 2
  }

  return (
    <Fragment>
      {loading && <FallbackSpinner />}

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <ProductCard valueDataHeaderProduct={dataHeader} />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Products' />
            <div className='flex flex-wrap justify-between gap-4 p-6'>
              <DebouncedInput
                value={globalFilter ?? ''}
                onChange={value => setGlobalFilter(String(value))}
                placeholder='Search Product'
                className='max-sm:is-full'
              />
              <div className='flex flex-wrap items-center max-sm:flex-col gap-4 max-sm:is-full is-auto'>
                <CustomTextField
                  select
                  value={table.getState().pagination.pageSize}
                  onChange={e => table.setPageSize(Number(e.target.value))}
                  className='flex-auto is-[70px] max-sm:is-full'
                >
                  <MenuItem value='10'>10</MenuItem>
                  <MenuItem value='25'>25</MenuItem>
                  <MenuItem value='50'>50</MenuItem>
                </CustomTextField>
                <Button
                  color='secondary'
                  variant='tonal'
                  className='max-sm:is-full is-auto'
                  startIcon={<i className='tabler-upload' />}
                >
                  Export
                </Button>
                <Button
                  variant='contained'
                  className='max-sm:is-full is-auto'
                  onClick={() => setAddCategoryOpen(!addCategoryOpen)}
                  startIcon={<i className='tabler-plus' />}
                >
                  Add Product
                </Button>
              </div>
            </div>
            <div className='overflow-x-auto'>
              <table className={tableStyles.table}>
                <thead>
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th key={header.id}>
                          {header.isPlaceholder ? null : (
                            <div
                              className={classnames({
                                'flex items-center': header.column.getIsSorted(),
                                'cursor-pointer select-none': header.column.getCanSort()
                              })}
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {{
                                asc: <i className='tabler-chevron-up text-xl' />,
                                desc: <i className='tabler-chevron-down text-xl' />
                              }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                {table.getFilteredRowModel().rows.length === 0 ? (
                  <tbody>
                    <tr>
                      <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                        No data available
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    {table
                      .getRowModel()
                      .rows.slice(0, table.getState().pagination.pageSize)
                      .map(row => {
                        return (
                          <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                            {row.getVisibleCells().map(cell => (
                              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                            ))}
                          </tr>
                        )
                      })}
                  </tbody>
                )}
              </table>
            </div>
            <TablePagination
              component={() => <TablePaginationComponent table={table} />}
              count={table.getFilteredRowModel().rows.length}
              rowsPerPage={table.getState().pagination.pageSize}
              page={table.getState().pagination.pageIndex}
              onPageChange={(_, page) => {
                table.setPageIndex(page)
              }}
            />
            <AddProductDrawer
              open={addCategoryOpen}
              onDataSubmit={CreateproductwithFile}
              handleClose={() => setAddCategoryOpen(!addCategoryOpen)}
            />
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default ProductListTable
