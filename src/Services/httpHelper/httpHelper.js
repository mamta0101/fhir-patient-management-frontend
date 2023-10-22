import axios from "axios";
export const httpAxios = axios.create({
  baseURL: "https://fhir-patient-management.onrender.com/",
});
