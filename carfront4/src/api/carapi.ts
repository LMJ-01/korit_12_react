import { CarResponse, Car, CarEntry } from '../types'
import axios from 'axios'
import { AxiosRequestConfig } from 'axios';

const getAxiosConfig = () : AxiosRequestConfig => {
    const token = localStorage.getItem('jwt');

    return {
        headers : {
            'Authorization' : token,
            'Content-Type' : 'application/json',
        }
    }
}

// GET
export const getCars = async () : Promise<CarResponse[]> => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/vehicles`, getAxiosConfig());

        return response.data._embedded.cars;
    }

// DELETE
export const deleteCar = async (link: string) => {
    const response = await axios.delete(link, getAxiosConfig());
    return response.data;
}

// POST
export const addCar = async(car: Car) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/vehicles`, car, getAxiosConfig());

    return response.data;
}

// PUT
export const updateCar = async (carEntry: CarEntry) : Promise<CarResponse> => {
    const response = await axios.put(carEntry.url, carEntry.car, getAxiosConfig());

    return response.data;
}