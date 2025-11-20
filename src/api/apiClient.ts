import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://recruit.paysbypays.com/api/v1",
});