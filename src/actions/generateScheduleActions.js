import axios from "axios";
import { BASE_URL } from "./baseUrl";

export const getAllAssests = async (plantId = "") => {
  try {
    const response = await axios.get(`${BASE_URL}/api/assets/${plantId}`);
    return response.data;
  } catch (error) {
    console.error("An error occurred:", error);
    return error;
  }
};

export const getAllPlants = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/plant`);
    return response.data;
  } catch (error) {
    console.error("An error occurred:", error);
    return error;
  }
};

export const openOrders = async ({ plant, asset, page = 1, pageSize = 10 }) => {
  const plantParam = plant ? `&plant=${plant}` : "";
  const assetParam = asset ? `&asset=${asset}` : "";
  try {
    const response = await axios.get(
      `${BASE_URL}/api/open-orders?page=${page}&page_size=${pageSize}${plantParam}${assetParam}`
    );
    return response.data;
  } catch (error) {
    console.error("An error occurred:", error);
    return error;
  }
};

export const getProductionSchedule = async ({ plant, asset }) => {
  const response = await axios.get(
    `${BASE_URL}/api/api/production-schedule/${asset}/${plant}`
  );
  return response.data;
};
