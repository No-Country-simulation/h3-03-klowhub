import { TLoginData, TRegisterData } from "@/types/service-types";

const LOGIN_URL = `${process.env.NEXT_PUBLIC_AUTH_URL}/login`;
const REGISTER_URL = `${process.env.NEXT_PUBLIC_AUTH_URL}/register`;

const apiFetch = async (url: string, options?: RequestInit) => {
  const response = await fetch(`${url}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json();
    return { status: false, error: errorData.message || 'Error al realizar la solicitud' };
  }

  const data = await response.json();
  return { status: true, response: data };
};

const login = async (data: TLoginData) => {
  return apiFetch(LOGIN_URL, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

const register = async (data: TRegisterData) => {
  return apiFetch(REGISTER_URL, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

const services = {
  login,
  register,
};

export default services;