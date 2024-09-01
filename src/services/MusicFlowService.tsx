import axios from 'axios';

const API_URL = 'http://localhost:5158/api'; // Оновіть за необхідністю

// Отримання треку за ID
export const getTrackById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/Tracks/GetById?id=${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching track by ID:', error);
        return null;
    }
};