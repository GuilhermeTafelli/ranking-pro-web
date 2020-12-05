import { useDispatch } from 'react-redux'

export const TOKEN_KEY = "@ranking-pro-token";
export const USER_KEY = "@ranking-pro-user"
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY)
};

export const getUser = () => localStorage.getItem(USER_KEY)
export const setUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user))
