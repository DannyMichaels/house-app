import api from './config'

export const createHouse = async (payload) => await api.post(`/houses`, payload)

export const getAllHouses = async () => {
    const response = await api.get(`/houses`)
    return response.data.data
}

export const updateHouseById = async (id, payload) => {
    await console.log(id, payload)
    await api.put(`/houses/${id}`, payload)
}
export const deleteHouseById = async (id) => await api.delete(`/houses/${id}`)
export const getHouseById = async (id) => {
    const response = await api.get(`/houses/${id}`)
    return response.data.data
}