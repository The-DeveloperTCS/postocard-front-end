import {
  isTestLoginEnabled,
  TEST_ACCOUNTS,
  DEV_MOCK_TOKEN,
} from "../Setting/testLogin";
import {
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  VALID_USER_SUCCESS,
} from "../Redux/Variables/UserVariables";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const DEV_USER_STORAGE_KEY = "postocard_dev_user";

export const matchTestAccount = (email, password) => {
  const normalizedEmail = String(email || "").trim().toLowerCase();

  if (
    normalizedEmail === TEST_ACCOUNTS.user.email.toLowerCase() &&
    password === TEST_ACCOUNTS.user.password
  ) {
    return { role: "user", account: TEST_ACCOUNTS.user };
  }

  if (
    normalizedEmail === TEST_ACCOUNTS.admin.email.toLowerCase() &&
    password === TEST_ACCOUNTS.admin.password
  ) {
    return { role: "admin", account: TEST_ACCOUNTS.admin };
  }

  return null;
};

export const buildDevUser = (role) => ({
  id: role === "admin" ? 999 : 1,
  name: role === "admin" ? "Test Admin" : "Test User",
  email:
    role === "admin" ? TEST_ACCOUNTS.admin.email : TEST_ACCOUNTS.user.email,
  IsAdmin: role === "admin" ? 1 : 0,
});

export const applyDevLogin = (
  role,
  navigate,
  checkbox,
  dispatch,
  { silent = false } = {}
) => {
  const user = buildDevUser(role);
  const cookieOptions = checkbox ? { expires: 7 } : undefined;

  Cookies.set("ApiLoginToken", DEV_MOCK_TOKEN, cookieOptions);
  sessionStorage.setItem(DEV_USER_STORAGE_KEY, JSON.stringify(user));
  dispatch({ type: LOGIN_USER_SUCCESS, payload: user });

  if (!silent) {
    toast.success("Logged in with offline test account");
  }

  navigate(role === "admin" ? "/admin/dashboard" : "/");
  return true;
};

export const tryDevLogin = (
  email,
  password,
  navigate,
  checkbox,
  dispatch
) => {
  if (!isTestLoginEnabled()) return false;

  const match = matchTestAccount(email, password);
  if (!match) return false;

  return applyDevLogin(match.role, navigate, checkbox, dispatch);
};

export const restoreDevSession = (dispatch) => {
  if (Cookies.get("ApiLoginToken") !== DEV_MOCK_TOKEN) return false;

  const storedUser = sessionStorage.getItem(DEV_USER_STORAGE_KEY);
  if (!storedUser) return false;

  dispatch({
    type: VALID_USER_SUCCESS,
    payload: JSON.parse(storedUser),
  });
  return true;
};

export const clearDevSession = () => {
  sessionStorage.removeItem(DEV_USER_STORAGE_KEY);
};

export const markLoginFailed = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};
