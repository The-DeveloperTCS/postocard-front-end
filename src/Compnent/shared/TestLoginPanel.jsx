import React from "react";
import { TEST_ACCOUNTS, isTestLoginEnabled } from "../../Setting/testLogin";

const TestLoginPanel = ({
  onUseAccount,
  onOfflineLogin,
  role = "user",
}) => {
  if (!isTestLoginEnabled()) return null;

  const account = TEST_ACCOUNTS[role] || TEST_ACCOUNTS.user;
  const otherAccount =
    role === "admin" ? TEST_ACCOUNTS.user : TEST_ACCOUNTS.admin;

  return (
    <div className="test-login-panel">
      <p className="test-login-panel__title">Test login (development)</p>
      <p className="test-login-panel__hint">
        API offline? Use offline login. Otherwise fill credentials and press
        Login.
      </p>
      <div className="test-login-panel__credentials">
        <span>
          <strong>{account.label}:</strong> {account.email} / {account.password}
        </span>
      </div>
      <div className="test-login-panel__actions">
        <button
          type="button"
          className="test-login-panel__btn"
          onClick={() => onUseAccount(account, false)}
        >
          Fill {account.label}
        </button>
        <button
          type="button"
          className="test-login-panel__btn test-login-panel__btn--primary"
          onClick={() => onUseAccount(account, true)}
        >
          Login as {account.label}
        </button>
        <button
          type="button"
          className="test-login-panel__btn test-login-panel__btn--offline"
          onClick={() => onOfflineLogin(account.role || role)}
        >
          Login offline ({account.label})
        </button>
        {role === "user" && (
          <button
            type="button"
            className="test-login-panel__btn test-login-panel__btn--offline"
            onClick={() => onOfflineLogin("admin")}
          >
            Login offline (Admin)
          </button>
        )}
      </div>
    </div>
  );
};

export default TestLoginPanel;
