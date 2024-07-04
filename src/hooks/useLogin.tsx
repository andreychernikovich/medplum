import { LoginAuthenticationResponse } from "@medplum/core";
import { useMedplum } from "@medplum/react-hooks";

import { trackLog } from "@utils/trackLog";
import { storage } from "@utils/storage";
import { LOGIN_CODE, LOGIN_VALUE } from "@constants/storage";
import { GOOGLE_ID, PROJECT_ID } from "@constants/environment";
import { ResourceType } from "@src/types/index";

const useLogin = () => {
  const medplum = useMedplum();

  const login = async (
    email: string,
    password: string,
    errorCallback: (error: Error) => void,
  ) => {
    try {
      const loginResponse: LoginAuthenticationResponse =
        await medplum.startLogin({
          email,
          password,
          projectId: PROJECT_ID,
          resourceType: ResourceType.Patient,
        });
      await handleLoginResponse(loginResponse, errorCallback);
    } catch (e) {
      trackLog<Error>("error in login handler", e);
      errorCallback(e);
    }
  };

  const googleLogin = async (
    idToken: string,
    errorCallback: (error: Error) => void,
  ) => {
    try {
      if (GOOGLE_ID) {
        const loginResponse: LoginAuthenticationResponse =
          await medplum.startGoogleLogin({
            googleClientId: GOOGLE_ID,
            googleCredential: idToken,
            projectId: PROJECT_ID,
          });
        await handleLoginResponse(loginResponse, errorCallback);
      }
    } catch (e) {
      trackLog<Error>("error in login handler", e);
      errorCallback(e);
    }
  };

  const handleLoginResponse = async (
    loginResponse: LoginAuthenticationResponse,
    errorCallback: (error: Error) => void,
  ) => {
    try {
      if (loginResponse.code) {
        try {
          const profileResource = await medplum.processCode(loginResponse.code);
          trackLog("profileResource in handleLoginResponse", profileResource);
        } catch (e) {
          trackLog<Error>(
            "Error in handleLoginResponse medplum.processCode:",
            e,
          );
          errorCallback(e);
        }
      }

      if (loginResponse.memberships) {
        try {
          await medplum.post("auth/profile", {
            login: loginResponse.login,
            profile: loginResponse.memberships[0].id,
          });
          await handleLoginResponse(loginResponse, errorCallback);
        } catch (e) {
          trackLog<Error>(
            "Error in handleLoginResponse medplum.post('auth/profile'):",
            e,
          );
          errorCallback(e);
        }
      }

      storage.set(LOGIN_CODE, String(loginResponse.code));
      storage.set(LOGIN_VALUE, String(loginResponse.login));

      trackLog<LoginAuthenticationResponse>(
        "loginResponse here!",
        loginResponse,
      );
    } catch (e) {
      trackLog<Error>("error in handleLoginResponse", e);
      errorCallback(e);
    }
  };

  return { login, googleLogin };
};

export default useLogin;
