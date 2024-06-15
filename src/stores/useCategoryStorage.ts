import { create } from 'zustand';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

if (process.env.NODE_ENV === 'development') {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  axios.defaults.baseURL = `${backendUrl}/api/v1`;
    //axios.defaults.baseURL = 'https://ecommerce-express.azurewebsites.net/api/v1';

} else {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  axios.defaults.baseURL = `${backendUrl}/api/v1`;
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
    productImgs: Array<{ id: number, imgUrl: string }> | []
}

type categoryStore = {
    categories: [],
    loading: boolean,
    getCategories: () => void
    postCategory: (data: any) => void
    patchCategory: (data: any) => void
    deleteCategory: (id: number) => void
}

const useCategoryStore = create<categoryStore>((set) => ({
    categories: [],
    loading: false,
    getCategories: () => {
        set({ loading: true })
        axios.get(`/products/categories`)
            .then(res => {
                set({ categories: res.data });
            })
            .catch(error => {
                console.error(error);
                enqueueSnackbar(error.message, { variant: 'error' });
            })
            .finally(() => set({ loading: false }));
    },
    postCategory: (data: any) => {
        set({ loading: true });
        axios.post("/products/categories", data, getConfig())
            .then((res) => {
                enqueueSnackbar(res.statusText, { variant: "success" });
            })
            .catch((err) => {
                console.error(err);
                enqueueSnackbar(err.response.data.message, { variant: 'error' });
            })
            .finally(() => {
                set({ loading: false });
            });
    },
    patchCategory: (data: any) => {
        set({ loading: true });
        axios.patch(`/products/categories/${data.category}`, data, getConfig())
            .then((res) => {
                enqueueSnackbar(res.statusText, { variant: "success" });
            })
            .catch((err) => {
                console.error(err);
                enqueueSnackbar(err.response.data.message, { variant: 'error' });
            })
            .finally(() => {
                set({ loading: false });
            });
    },
    deleteCategory: (id: number) => {
        set({ loading: true });
        axios.delete(`/products/categories/${id}`, getConfig())
            .then((res) => {
                enqueueSnackbar(res.statusText, { variant: "success" });
            })
            .catch((err) => {
                console.error(err);
                enqueueSnackbar(err.response.data.message, { variant: 'error' });
            })
            .finally(() => {
                set({ loading: false });
            });
    }

}));

const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export default useCategoryStore;