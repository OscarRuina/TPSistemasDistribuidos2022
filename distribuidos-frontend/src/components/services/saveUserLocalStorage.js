export const saveInLocalStorage = user => {
  console.log(user);
  window.localStorage.setItem('user', user);
};
