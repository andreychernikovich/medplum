export const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const validatePassword = (password: string) => {
  const re = /^(?=.*?[A-Z]).{8,}$/;
  return re.test(password);
};
