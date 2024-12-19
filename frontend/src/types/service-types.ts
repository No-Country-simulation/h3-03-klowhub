export type TLoginData = {
  email: string;
  password: string;
};

export type TRegisterData = {
  name: string;
  email: string;
  password: string;
};

export type TCreateBoardData = {
  boardName: string;
};

export type TCreateListData = {
  boardId: string,
  listName: string,
}

export type TCreateCardData = {
  listId: string;
  name: string;
  desc?: string;
}

export type TCreateCustomFieldData = {
    idModel: string;
    modelType: string;
    name: string;
    type: string;
    pos: string
}

export type TUpdateCustomFieldItemData = {
  idCard: string,
  idCustomField: string,
  value: {
    text: string
  }
}

export type TInviteBoardMemberData = {
  boardId: string,
  memberEmail: string
}

