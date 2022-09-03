export const loadUserFromLocalStorage = () => {
  if (window.localStorage.getItem('user') !== null) {
    return window.localStorage.getItem('user');
  }
};

export const saveInLocalStorage = user => {
  console.log(user);
  window.localStorage.setItem('user', user);
};
