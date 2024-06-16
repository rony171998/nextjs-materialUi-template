import { create } from 'zustand';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
axios.defaults.baseURL = `${backendUrl}/api/v1`;

export type Cart = Array<{
  id: number
  cartId: number
  productId: number
  quantity: number
  status: string
  createdAt: string
  updatedAt: string
  product: {
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
  }
}>

type categoryStore = {
  cart: [] | Cart,
  loading: boolean,
  getCart: () => void
  addProductToCart: (productId: any, quantity: any) => Promise<void>
  patchProductToCart: (productId: any, quantity: any) => void
  deleteProductFromCart: (id: any) => void
}

const useCartStore = create<categoryStore>((set) => ({
  cart: [],
  loading: false,
  getCart: () => {
    set({ loading: true });
    axios.get("/cart", getConfig())
      .then((res) => set({ cart: res.data.productsinCarts }))
      .finally(() => set({ loading: false }));
  },
  addProductToCart: (productId, quantity) => {
    const data = { productId, quantity };
    set({ loading: true });
    axios.post("/cart/add-product", data, getConfig())
      .then((res) => {
        enqueueSnackbar(res.statusText, { variant: "success" });
        axios.get("/cart", getConfig())
      .then((res) => set({ cart: res.data.productsinCarts }))
      .finally(() => set({ loading: false }));
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
        axios.get("/cart", getConfig())
      .then((res) => set({ cart: res.data.productsinCarts }))
      .finally(() => set({ loading: false }));
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
        axios.get("/cart", getConfig())
      .then((res) => set({ cart: res.data.productsinCarts }))
      .finally(() => set({ loading: false }));
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