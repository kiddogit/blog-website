import { api } from "./api"

export const fetchStories = async page => {
  const response = await api.get(`/stories?page=${page}`)
  return response.data
}

export const createNewStory = async values => {
  const response = await api.post('/stories', values)
  return response.data
}

export const fetchSingleStory = async id => {
  const response = await api.get(`/stories/${id}`)
  return response.data
}

export const fetchMyStories = async () => {
  const response = await api.get('/stories/me')
  return response.data
}

export const editStory = async (id, values) => {
  const response = await api.put(`/stories/${id}`)
  return response.data
}

export const deleteStory = async id => {
  const response = await api.delete(`/stories/${id}`)
  return response.data
}