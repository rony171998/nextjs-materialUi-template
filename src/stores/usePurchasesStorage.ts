import { create } from 'zustand';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:4000/api/v1';
  //axios.defaults.baseURL = 'https://ecommerce-express.azurewebsites.net/api/v1';

} else {
  axios.defaults.baseURL = 'https://ecommerce-express.azurewebsites.net/api/v1';
}

type purchasesStore = {
  purchases: [],
  loading: boolean,
  getPurchases: () => void
  postPurchase: (data: any) => void
}

const purchasesStore = create<purchasesStore>((set) => ({
  purchases: [],
  loading: false,
  getPurchases: () => {
    set({ loading: true });
    axios.get("/purchases", getConfig())
      .then((res) => {
        set({purchases: res.data.purchases})
        enqueueSnackbar(res.statusText, { variant: "success" });
      })
      .catch((err) => {
        console.error(err);
        enqueueSnackbar(err.response.data.message, { variant: 'error' });
      })
      .finally(() => set({ loading: false }));
  },
  postPurchase: (data) => {
    set({ loading: true });
    axios.post("/purchases", data, getConfig())
      .then((res) => {
        enqueueSnackbar(res.statusText, { variant: "success" });
      })
      .catch((err) => {
        console.error(err);
        enqueueSnackbar(err.response.data.message, { variant: 'error' });
      })
      .finally(() => set({ loading: false }));
  },
}));

const getConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export default purchasesStore;