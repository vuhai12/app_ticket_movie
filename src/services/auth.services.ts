import { logonApi, registerAuth } from "@api/auth.api";

export const loginServices = async (payload: {
  email: string;
  password: string;
}) => {
  try {
    const data = await logonApi(payload);

    localStorage.setItem("access_token", data.session.access_token);
    localStorage.setItem("refresh_token", data.session.refresh_token);
    localStorage.setItem("role", data.user.role!);
    localStorage.setItem("user", data.user.user_metadata.name!);

    return data.user;
  } catch (error) {
    throw error;
  }
};

export const registerServices = async (payload: {
  email: string;
  name: string;
  password: string;
}) => {
  try {
    const data = await registerAuth(payload);

    return data;
  } catch (error) {
    throw error;
  }
};
