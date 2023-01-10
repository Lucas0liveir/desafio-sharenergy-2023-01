import { makeHttpRequest } from "../adapters/httpRequest";

console.log(import.meta.env.VITE_REACT_API_URL);


export const httpRequest = makeHttpRequest(import.meta.env.VITE_REACT_API_URL)