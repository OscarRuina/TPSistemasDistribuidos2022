export const registerUser = loginForm => {
  let payload = {
    user: loginForm.user,
    password: loginForm.password,
  };

  console.log(payload);
};
