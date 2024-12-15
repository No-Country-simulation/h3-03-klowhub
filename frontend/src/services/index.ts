const LOGIN_URL = `${process.env.NEXT_PUBLIC_AUTH_URL}/login`
const REGISTER_URL = `${process.env.NEXT_PUBLIC_AUTH_URL}/register`

const apiFetch = async (url: string, options?: RequestInit) => {
  const response = await fetch(`${url}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al realizar la solicitud');
  }

  return response.json();
};

const login = async <T>(data: T) =>
  apiFetch(LOGIN_URL, {
    method: 'POST',
    body: JSON.stringify(data),
  });

const register = async <T>(data: T) =>
  apiFetch(REGISTER_URL, {
    method: 'POST',
    body: JSON.stringify(data),
  });

const services = {
  login,
  register,
};

export default services;