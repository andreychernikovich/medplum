export type RootStackParamList = {
  FORGOT_PASSWORD: undefined;
  SIGN_UP: undefined;
  LOGIN: undefined;
};

export type BottomStackParamList = {
  HOME: undefined;
  PROFILE: undefined;
};

export type ProfileStackParamList = {
  PROFILE: undefined;
  EDIT_PROFILE: undefined;
  SETTINGS: undefined;
};

export type NavAction = {
  type: string,
  payload: string | boolean,
};
