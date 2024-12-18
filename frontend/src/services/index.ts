import { TCreateBoardData, TCreateListData, TInviteBoardMemberData, TLoginData, TRegisterData } from "@/types/service-types";

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

// TRELLO API CALLS
const API_TRELLO_URL = "https://api.trello.com";
const TRELLO_API_KEY = process.env.NEXT_PUBLIC_TRELLO_API_KEY;
const TRELLO_API_TOKEN = process.env.NEXT_PUBLIC_TRELLO_API_TOKEN;

const createBoard = async (data: TCreateBoardData) => {
  return apiFetch(
    `${API_TRELLO_URL}/1/boards/?name=${data.boardName}&defaultLists=false&prefs_permissionLevel=private&prefs_background=675dd7e068197fb1e0a2f7f4&key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`,
    {
      method: 'POST',
    }
  );
};

const createList = async (data: TCreateListData) => {
  return apiFetch(
    `${API_TRELLO_URL}/1/lists?name=${data.listName}&pos=bottom&idBoard=${data.boardId}&key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`,
    {
      method: 'POST',
    }
  );
};

const inviteBoardMemberByEmail = async (data: TInviteBoardMemberData) => {
  return apiFetch(
    `${API_TRELLO_URL}/1/boards/${data.boardId}/members?email=${data.memberEmail}&allowBillableGuest=true&key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`,
    {
      method: 'PUT',
    }
  );
};

const services = {
  login,
  register,
  createBoard,
  createList,
  inviteBoardMemberByEmail
};

export default services;