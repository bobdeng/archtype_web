import axios from 'axios';

interface User {
  username: string;
  password: string;
  token: string;
}

export const localStorageKey = '__auth_provider_token__';

export const login = (params: { username: string, password: string }) => {
  return axios.post<{ username: string, password: string }, User>('/api/1.0/users', params).then(res => {
    window.localStorage.setItem(localStorageKey, res.token);
  });
}

export const logout = () => {
  window.localStorage.removeItem(localStorageKey);
}

export const handleUserResponse = (user: User) => {
  window.localStorage.setItem(localStorageKey, user.token || '');
}
