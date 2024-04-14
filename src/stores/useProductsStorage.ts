import { create } from 'zustand';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:4000/api/v1';
    //axios.defaults.baseURL = 'https://ecommerce-express.azurewebsites.net/api/v1';
     
} else {
    axios.defaults.baseURL = 'https://ecommerce-express.azurewebsites.net/api/v1';  
}

type productsStore = {
  products: Product[] | [],
  fetchData: () => void,
}

export type Product = {
  id: number
  title: string
  description: string
  quantity: number
  price: number
  userId: number
  categoryId: number
  status: string
  createdAt: string
  updatedAt: string
  productImgs: Array<any>
}


const useProductsStore = create<productsStore>((set) => ({
  products: [],
  fetchData: async () => {
    try {
      const response = await axios.get('/products');
      if (response.status === 200) {
        // Si la respuesta es 200, actualiza los productos en el estado
        set({ products: response.data.products });
      } else if (response.status === 304) {
        // Si la respuesta es 304, no actualices los productos en el estado
        enqueueSnackbar('No hay cambios en los productos.' , { variant: 'info'});
      }
    } catch (error:any) {
      console.error('Error fetching data:', error);
      enqueueSnackbar(error.message , {variant: 'error'});
    }
  },
}));

export default useProductsStore;
