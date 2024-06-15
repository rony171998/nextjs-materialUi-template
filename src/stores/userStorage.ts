import { create } from 'zustand';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://ec2-18-217-218-230.us-east-2.compute.amazonaws.com/api/v1';
} else {
  axios.defaults.baseURL = 'https://ec2-18-217-218-230.us-east-2.compute.amazonaws.com/api/v1';
}

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

// Obtener el token del localStorage solo si estamos en el entorno del navegador
const getTokenFromLocalStorage = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

const useAuthStore = create<AuthStore>((set) => ({
  token: getTokenFromLocalStorage(),
  loading: false,
  login: async (credentials) => {
    set({ loading: true });
    axios.post('/users/login', credentials)
      .then((response) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem("token", response.data.token);
        }
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
        if (typeof window !== 'undefined') {
          localStorage.setItem("token", response.data.token);
        }
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
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    set({ token: null });
  }
}));

export default useAuthStore;

