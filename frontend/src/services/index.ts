import { TCreateBoardData, TCreateCardData, TCreateCustomFieldData, TCreateListData, TInviteBoardMemberData, TLoginData, TRegisterData, TUpdateCustomFieldItemData } from "@/types/service-types";

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
const TRELLO_API_KEY = process.env.TRELLO_API_KEY;
const TRELLO_API_TOKEN = process.env.TRELLO_API_TOKEN;

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

const createCard = async (data: TCreateCardData) => {
  return apiFetch(
   `${API_TRELLO_URL}/1/cards?idList=${data.listId}&pos=bottom&name=${data.name}&${data.desc ? `desc=${data.desc}&` : ``}key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`,
    {
      method: 'POST',
    }
  );
};

const createCustomFieldOnBoard = async (data: TCreateCustomFieldData) => {
  return apiFetch(
   `${API_TRELLO_URL}/1/customFields?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`,
    {
      method: 'POST',
      body: JSON.stringify(data),
    }
  );
};

const updateCustomFieldItemOnCard = async (data: TUpdateCustomFieldItemData) => {
  return apiFetch(
   `${API_TRELLO_URL}/1/cards/${data.idCard}/customField/${data.idCustomField}/item?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`,
    {
      method: 'PUT',
      body: JSON.stringify({value: data.value}),
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
  createCard,
  createCustomFieldOnBoard,
  updateCustomFieldItemOnCard,
  inviteBoardMemberByEmail
};

export default services;
