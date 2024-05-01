import { create } from 'zustand';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:4000/api/v1';
} else {
  axios.defaults.baseURL = 'https://ecommerce-express.azurewebsites.net/api/v1';
}

type User = {
  id: number;
  username: string;
  email: string;
}

type AuthStore = {
  token: string | null; // Cambiado de User a string para almacenar el token
  login: (credentials: { email: string; password: string }) => Promise<void>;
  signup: (userData: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const useAuthStore = create<AuthStore>((set) => ({
  token: localStorage.getItem('token') || null, // Obtener el token del localStorage
  loading: false,
  login: async (credentials) => {
    set({ loading: true })
    axios.post('/users/login', credentials)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        set({ token: response.data.token }); // Guardar el token en el estado
        enqueueSnackbar('Login successful', { variant: 'success' })
      })
      .catch((error) => {
        console.error('Error login:', error);
        enqueueSnackbar(error.response.data.message || 'Error login', { variant: 'error' });
      })
      .finally(() => set({ loading: false }));
  },
  signup: async (userData) => {
    set({ loading: true })
    axios.post('/users', userData)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        set({ token: response.data.token }); // Guardar el token en el estado
        enqueueSnackbar('Signup successful', { variant: 'success' });
      })
      .catch((error) => {
        console.error('Error signing up:', error);
        enqueueSnackbar(error.response.data.message || 'Error signing up', { variant: 'error' });
      })
      .finally(() => set({ loading: false }));
  },
  logout: () => {
    localStorage.removeItem('token'); // Eliminar el token del localStorage al hacer logout
    set({ token: null }); // Limpiar el token del estado
    // Agrega cualquier lógica adicional de logout aquí (por ejemplo, limpiar localStorage, etc.)
  }
}));

export default useAuthStore;
