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
}

const useAuthStore = create<AuthStore>((set) => ({
  token: localStorage.getItem('token') || null, // Obtener el token del localStorage
  login: async (credentials) => {
    try {
      const response = await axios.post('/users/login', credentials);
      localStorage.setItem("token", response.data.token);
      set({ token: response.data.token }); // Guardar el token en el estado
      enqueueSnackbar('Login successful', { variant: 'success' });
    } catch (error) {
      console.error('Error logging in:', error);
      enqueueSnackbar(error.response.data.message || 'Error logging in', { variant: 'error' });
    }
  },
  signup: async (userData) => {
    try {
      const response = await axios.post('/users', userData);
      localStorage.setItem("token", response.data.token);
      set({ token: response.data.token }); // Guardar el token en el estado
      enqueueSnackbar('Signup successful', { variant: 'success' });
    } catch (error) {
      console.error('Error signing up:', error);
      enqueueSnackbar(error.response.data.message || 'Error signing up', { variant: 'error' });
    }
  },
  logout: () => {
    localStorage.removeItem('token'); // Eliminar el token del localStorage al hacer logout
    set({ token: null }); // Limpiar el token del estado
    // Agrega cualquier lógica adicional de logout aquí (por ejemplo, limpiar localStorage, etc.)
  }
}));

export default useAuthStore;
