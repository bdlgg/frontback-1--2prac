import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
    }
});

export const api = {
    createItem: async (item) => {
        let response = await apiClient.post("/items", item);
        return response.data;
    },
    getItems: async () => {
        let response = await apiClient.get("/items");
        return response.data;
    },
    getItemById: async (id) => {
        let response = await apiClient.get(`/items/${id}`);
        return response.data;
    },
    updateItem: async (id, item) => {
        let response = await apiClient.patch(`/items/${id}`, item);
        return response.data;
    },
    deleteItem: async (id) => {
        let response = await apiClient.delete(`/items/${id}`);
        return response.data;
    }
}