'use client'
import { Box, Button, Chip, } from '@mui/material';
import useProductsStore, { Product } from '@/stores/useProductsStorage';
import { IconHttpDelete } from '@tabler/icons-react';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { CustomNoRowsOverlay, CustomPagination, CustomToolbar } from '@/components/utils/datagrid/DataGridCustom';
import Image from 'next/image';
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
// ----------------------------------------------------------------------

interface Props {
  products: Product[] | []
}

export default function ProductsViewGrid(props: Props) {
  const { deleteProduct } = useProductsStore()
  const { myproducts, getMyProducts, loading } = useProductsStore();

  useEffect(() => {
    if (!myproducts.products) {
      getMyProducts()
    }
  }, []);

  const handleDeleteProduct = (id: number) => {
    deleteProduct(id)
    getMyProducts()
  }

  const listview = ['productImgs', 'title', 'quantity', 'price', 'status']

  return (
    <Box sx={{ height: '70vh' }}>
      <DataGrid
        loading={loading}
        sx={{
          borderRadius: '14px',
          backgroundColor: 'darkmode.cardglass.background',
          overflow: 'auto'
        }}
        getRowHeight={() => 'auto'} getEstimatedRowHeight={() => 350}
        columns={myproducts.products.length > 0 ?
          [
            ...Object.keys(myproducts.products[0]).map((item: string) => {
              if (item == 'productImgs') {
                return {
                  field: item,
                  headerName: 'Image',
                  width: 250,
                  height: 550,
                  renderCell: (params: GridCellParams) => {
                    if (params.value.length) {
                      return (
                        <Image
                          src={params.value[0].imgUrl}
                          width={100}
                          height={100}
                          objectFit='responsive'
                          //style={{ objectFit: 'contain' }}
                          alt='Image' />
                      );
                    }
                  },
                }

              } else if (item == 'status') {
                return {
                  field: item, headerName: item, width: 120, height: 250,
                  renderCell: (params: GridCellParams) => (
                    <Chip label={params.value} color={params.value == 'deleted' ? 'error' : 'success'} />
                  )
                };
              } else {
                return { field: item, headerName: item, width: 120, height: 250 };
              }
            }),
            {
              field: 'actions',
              headerName: 'Delete',
              width: 120, height: 250,
              renderCell: (params: GridCellParams) => {
                if (params.row.status === 'active')
                  return (
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteProduct(params.row.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  );
              },
            }
          ] : []}
        rows={myproducts.products.length > 0 ? myproducts.products?.map((item, index) => {
          return {
            ...item,
          }
        }) : []}
        columnVisibilityModel={{
          // Hide columns status and traderName, the other columns will remain visible
          id: false,
          userId: false,
          createdAt: false,
          updatedAt: false,
          categoryId: false,
        }}
        slots={{
          toolbar: CustomToolbar,
          pagination: CustomPagination,
          noRowsOverlay: CustomNoRowsOverlay,
        }}
      />
    </Box>
  );
}





