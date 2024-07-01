import { create } from 'zustand';
import axios from 'axios';
import Cookies from 'js-cookie';
import { enqueueSnackbar } from 'notistack';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
axios.defaults.baseURL = `${backendUrl}/api/v1`;

type User = {
  id: number;
  username: string;
  email: string;
}

type AuthStore = {
  token: string | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  signup: (userData: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// Obtener el token de las cookies
const getTokenFromCookies = (): string | null => {
  return Cookies.get('token') || null;
};

const useAuthStore = create<AuthStore>((set) => ({
  token: getTokenFromCookies(),
  loading: false,
  login: async (credentials) => {
    set({ loading: true });
    axios.post('/users/login', credentials)
      .then((response) => {
        Cookies.set('token', response.data.token, { expires: 7 });
        set({ token: response.data.token });
        enqueueSnackbar('Login successful', { variant: 'success' });
      })
      .catch((error) => {
        console.error('Error login:', error);
        enqueueSnackbar(error.response?.data?.message || 'Error login', { variant: 'error' });
      })
      .finally(() => set({ loading: false }));
  },
  signup: async (userData) => {
    set({ loading: true });
    axios.post('/users', userData)
      .then((response) => {
        Cookies.set('token', response.data.token, { expires: 7 });
        set({ token: response.data.token });
        enqueueSnackbar('Signup successful', { variant: 'success' });
      })
      .catch((error) => {
        console.error('Error signing up:', error);
        enqueueSnackbar(error.response?.data?.message || 'Error signing up', { variant: 'error' });
      })
      .finally(() => set({ loading: false }));
  },
  logout: () => {
    Cookies.remove('token');
    set({ token: null });
  }
}));

export default useAuthStore;
