export const loadUserFromLocalStorage = () => {
  if (window.localStorage.getItem('user') !== null) {
    let data = window.localStorage.getItem('user');

    return JSON.parse(data);
  }
};

export const saveInLocalStorage = user => {
  window.localStorage.setItem('user', JSON.stringify(user));
};
