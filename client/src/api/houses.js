import api from './config'

export const insertHouse = async (payload) => await api.post(`/house`, payload)
export const getAllHouses = async () => await api.get(`/houses`)
export const updateHouseById = async(id, payload) => await api.put(`/house/${id}`, payload)
export const deleteHouseById = async (id) => await api.delete(`/house/${id}`)
export const getHouseById = async (id) => await api.get(`/house/${id}`)