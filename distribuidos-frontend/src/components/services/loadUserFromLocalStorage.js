export const loadUserFromLocalStorage = () => {
  if (window.localStorage.getItem('user') !== null) {
    return window.localStorage.getItem('user');
  }
};
