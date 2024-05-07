import { api } from './api';

export const registerUser = async (values) => {
  const response = await api.post('/auth/register', values)
  return response.data
}

export const loginUser = async (values) => {
  const response = await api.post('/auth/login', values)
  return response.data
}