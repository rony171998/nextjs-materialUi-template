import { create } from 'zustand';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:4000/api/v1';
  //axios.defaults.baseURL = 'https://ecommerce-express.azurewebsites.net/api/v1';

} else {
  axios.defaults.baseURL = 'https://ecommerce-express.azurewebsites.net/api/v1';
}

type categoryStore = {
  cart: [],
  loading: boolean,
  getCart: () => void
  addProductToCart: (productId: any, quantity: any) => void
  patchProductToCart: (productId: any, quantity: any) => void
  deleteProductFromCart: (id: any) => void
}

const useCartStore = create<categoryStore>((set) => ({
  cart: [],
  loading: false,
  getCart: () => {
    set({ loading: true });
    axios.get("/cart", getConfig())
      .then((res) => set({ cart: res.data }))
      .finally(() => set({ loading: false }));
  },
  addProductToCart: (productId, quantity) => {
    const data = { productId, quantity };
    set({ loading: true });
    axios.post("/cart/add-product", data, getConfig())
      .then((res) => {
        enqueueSnackbar(res.statusText, { variant: "success" });
      })
      .catch((err) => {
        console.error(err);
        enqueueSnackbar(err.response.data.message, { variant: 'error' });
      })
      .finally(() => set({ loading: false }))
  },
  patchProductToCart: (productId, quantity) => {
    const data = { productId, newQuantity: quantity };
    set({ loading: true });
    axios.patch("/cart/update-cart", data, getConfig())
      .then((res) => {
        enqueueSnackbar(res.statusText, { variant: "success" });
      })
      .catch((err) => {
        console.error(err);
        enqueueSnackbar(err.response.data.message, { variant: 'error' });
      })
      .finally(() => set({ loading: false }))
      
  },
  deleteProductFromCart: (id) => {
    set({ loading: true });
    axios.delete(`/cart/${id}`, getConfig())
      .then((res) => {
        enqueueSnackbar(res.statusText, { variant: "success" });
      })
      .catch((err) => {
        console.error(err);
        enqueueSnackbar(err.response.data.message, { variant: 'error' });
      })
      .finally(() => set({ loading: false }))
      
  },
}));

const getConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export default useCartStore;