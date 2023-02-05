import axios from "axios";
import { toast } from "react-toastify";

export const nodeURL = process.env.REACT_APP_SERVER_URL;

export const createProduct = async (productData) => {
  const response = await axios.post(`${nodeURL}/api/products`, productData);
  return response.data;
};

export const getAllProducts = async () => {
  const response = await axios.get(`${nodeURL}/api/products/all-products`);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${nodeURL}/api/products/${id}`);
  return response.data;
};
