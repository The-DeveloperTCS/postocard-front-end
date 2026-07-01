/**
 * Dev/test login accounts — override via .env if your API uses different creds.
 * REACT_APP_TEST_USER_EMAIL, REACT_APP_TEST_USER_PASSWORD
 * REACT_APP_TEST_ADMIN_EMAIL, REACT_APP_TEST_ADMIN_PASSWORD
 */
export const TEST_ACCOUNTS = {
  user: {
    label: "Test User",
    role: "user",
    email: process.env.REACT_APP_TEST_USER_EMAIL || "user@test.com",
    password: process.env.REACT_APP_TEST_USER_PASSWORD || "12345678",
  },
  admin: {
    label: "Test Admin",
    role: "admin",
    email: process.env.REACT_APP_TEST_ADMIN_EMAIL || "admin@test.com",
    password: process.env.REACT_APP_TEST_ADMIN_PASSWORD || "12345678",
  },
};

export const isTestLoginEnabled = () =>
  process.env.NODE_ENV === "development" ||
  process.env.REACT_APP_ENABLE_TEST_LOGIN === "true";

export const DEV_MOCK_TOKEN = "dev-mock-token";
