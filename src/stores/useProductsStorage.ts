import { create } from 'zustand';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
axios.defaults.baseURL = `${backendUrl}/api/v1`;
  

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
  productImgs: Array<{ id: number, imgUrl: string }> | []
}

export type User = {
  id: number
  name: string
  email: string
  password: string
  status: string
  role: string
  createdAt: string
  updatedAt: string
  products: Array<{
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
    productImgs: Array<{
      id: number
      imgUrl: string
    }>
  }>
}

type productsStore = {
  products: Product[] | [],
  productId: Product | null,
  myproducts: User | null,
  loading: boolean,
  fetchData: () => void,
  postProduct: (formData: FormData) => void
  getMyProducts: () => void
  deleteProduct: (id: number) => void
  patchProduct: (id: number, data: any) => void
  filterProductsByPrices: (priceMin: number, priceMax: number) => void
  filterProductsByName: (name: string) => void
  filterCategory: (id: number) => void
  getProductById: (id: any) => void
}

const useProductsStore = create<productsStore>((set) => ({
  products: [],
  productId: null,
  myproducts: null,
  loading: false,
  fetchData: async () => {
    set({ loading: true })
    axios.get('/products')
      .then((response) => set({ products: response.data.products }))
      .catch((error) => {
        console.error('Error fetching data:', error);
        enqueueSnackbar(error.message, { variant: 'error' });
      })
      .finally(() => set({ loading: false }));
  },
  getProductById: (id:any) => {
    set({ loading: true })
    axios.get('/products/' + id)
      .then((response) => {
        console.log(response)
        set({ productId: response.data.products })
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        enqueueSnackbar(error.message, { variant: 'error' });
      })
      .finally(() => set({ loading: false }));
  },
  postProduct: async (formData: FormData) => {
    set({ loading: true })
    axios.post("/products", formData, getConfig())
      .then((response) => enqueueSnackbar(response.statusText, { variant: 'success' }))
      .catch((error) => {
        console.error('Error fetching data:', error);
        enqueueSnackbar(error.message, { variant: 'error' });
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      })
      .finally(() => set({ loading: false }));
  },
  getMyProducts: () => {
    set({ loading: true })
    axios.get(`/users/me`, getConfig())
      .then(res => {
        if (res.status === 200) {
          set({ myproducts: res.data.user });
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        enqueueSnackbar(error.message, { variant: 'error' });
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      })
      .finally(() => set({ loading: false }));
  },
  deleteProduct: (id: number) => {
    set({ loading: true });
    axios.delete(`/products/${id}`, getConfig())
      .then(response => {
        enqueueSnackbar(response.statusText, { variant: "success" }); // Asumiendo que swal está disponible en este contexto
      })
      .catch(error => {
        console.error(error);
        enqueueSnackbar(error.response.data.message, { variant: "error" }); // Asumiendo que swal está disponible en este contexto
      })
      .finally(() => {
        set({ loading: false });
        //getMyProducts() // Llama a la función getMyProducts para actualizar la lista de productos
      });
  },
  patchProduct: (id: number, data: any) => {
    set({ loading: true });
    axios.patch(`/products/${id}`, data, getConfig())
      .then(response => {
        console.log(response); // Puedes modificar esto según tus necesidades
        enqueueSnackbar(response.statusText, { variant: "success" }); // Asumiendo que enqueueSnackbar está disponible en este contexto
      })
      .catch(error => {
        console.error(error);
        enqueueSnackbar(error.response.data.message, { variant: "error" }); // Asumiendo que enqueueSnackbar está disponible en este contexto
      })
      .finally(() => {
        set({ loading: false });
        //getProducts()(set); // Llama a la función getProducts para actualizar la lista de productos
      });
  },
  filterProductsByPrices: (priceMin: number, priceMax: number) => {
    set({ loading: true });
    axios.get("/products")
      .then(res => {
        const productsSearched = res.data.data.products.filter(
          productsItem =>
            productsItem.price >= priceMin &&
            productsItem.price <= priceMax
        );
        set({ products: productsSearched });
      })
      .finally(() => set({ loading: false }));
  },

  filterProductsByName: (name: string) => {
    set({ loading: true });
    axios.get("/products")
      .then(res => {
        console.log(res)
        const productsSearched = res.data.products.filter(
          productsItem => productsItem.title.toLowerCase().includes(name.toLowerCase())
        );
        set({ products: productsSearched });
      })
      .finally(() => set({ loading: false }));
  },

  filterCategory: (id: number) => {
    set({ loading: true });
    axios.get(`/products`)
      .then(res => {
        const productsSearched = res.data.data.products.filter(
          productsItem => productsItem.category.id === id
        );
        set({ products: productsSearched });
      })
      .finally(() => set({ loading: false }));
  }

}));

const getConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export default useProductsStore;
