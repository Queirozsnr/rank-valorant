import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/https://api.kyroskoh.xyz/valorant/v1/',
});

export const getMMR = async (username, tag) => {
  try {
    const response = await api.get(`mmr/na/${username}/${tag}`);
    return response.data;
  } catch (error) {
    return null; // Retorna null em caso de erro
  }
};

export default api;
