interface IUser {
  fullName: string;
  email: string;
  password: string;
}

export const setRegisteredUser = (user: IUser) => {
  const userList: IUser[] =
    JSON.parse(localStorage.getItem('registeredUser')) || [];

  userList.push(user);

  return localStorage.setItem('registeredUser', JSON.stringify(userList));
};

export const getRegisteredUser = () => {
  return JSON.parse(localStorage.getItem('registeredUser'));
};

export const checkExistingAccount = (email: string) => {
  const registeredUsers = getRegisteredUser();
  if (registeredUsers) {
    const existingUser = registeredUsers.find(
      (user: IUser) => user.email === email
    );
    return existingUser !== undefined;
  }
  return false;
};

export const loginUser = (user: IUser) => {
  return localStorage.setItem('infoUser', JSON.stringify(user));
};

export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem('infoUser'));
};
export const isLoggedIn = () => {
  return JSON.parse(localStorage.getItem('infoUser')) ? true : false;
};

export const removeUser = () => {
  return localStorage.removeItem('infoUser');
};

export const editUser = (user: IUser) => {
  return localStorage.setItem('infoUser', JSON.stringify(user));
};

export const paymentHistoryByEmail = (emailUser: string) => {
  const paymentHistory: [] =
    JSON.parse(localStorage.getItem('paymentHistory')) || [];

  const newPaymentHistory = paymentHistory.filter(
    (item: any) => item.email === emailUser
  );

  return newPaymentHistory;
};
export const getCartsByEmail = (emailUser: string) => {
  const carts: [] = JSON.parse(localStorage.getItem('carts')) || [];

  const newCarts = carts.filter((item: any) => item.email === emailUser);

  return newCarts;
};
