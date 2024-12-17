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

export type TInviteBoardMemberData = {
  boardId: string,
  memberEmail: string
}

