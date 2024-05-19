import { api } from "./api"

export const fetchStories = async page => {
  const response = await api.get(`/stories?page=${page}`)
  return response.data
}

export const createStory = async values => {
  const response = await api.post('/stories', values)
  return response.data
}

export const fetchSingleStory = async (id) => {
  const response = await api.get(`/stories/${id}`)
  return response.data
}

// export const fetchMyStories = async () => {
//   const response = await api.get(`/stories/me`)
//   return response.data
// }