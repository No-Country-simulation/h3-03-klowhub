import axios from "axios";

const api = axios.create({
    // url que viene del .env o el local
    baseURL: process.env.NEXT_PUBLIC_COURSES_URL || "http://localhost:3001", 
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials:true
  });


  const login = async <T>(data: T) => await api.post('/auth/login', data)
  const register = async <T>(data: T) => await api.post('/auth/register', data)

const services = {
    login,
    register
  }

  export default services;