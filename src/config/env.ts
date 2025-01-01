interface EnvConfig {
  apiUrl: string;
  auth: {
    cookieName: string;
    cookieDomain: string;
  };
  features: {
    enableRegistration: boolean;
    enableSocialLogin: boolean;
    enablePasswordReset: boolean;
    enableInviteCode: boolean;
  };
  app: {
    name: string;
    supportEmail: string;
  };
  security: {
    maxLoginAttempts: number;
    loginTimeoutMinutes: number;
  };
}

export const env: EnvConfig = {
  apiUrl: import.meta.env.VITE_API_URL,
  auth: {
    cookieName: import.meta.env.VITE_AUTH_COOKIE_NAME,
    cookieDomain: import.meta.env.VITE_AUTH_COOKIE_DOMAIN,
  },
  features: {
    enableRegistration: import.meta.env.VITE_ENABLE_REGISTRATION === 'true',
    enableSocialLogin: import.meta.env.VITE_ENABLE_SOCIAL_LOGIN === 'true',
    enablePasswordReset: import.meta.env.VITE_ENABLE_PASSWORD_RESET === 'true',
    enableInviteCode: import.meta.env.VITE_ENABLE_INVITE_CODE === 'true',
  },
  app: {
    name: import.meta.env.VITE_APP_NAME,
    supportEmail: import.meta.env.VITE_SUPPORT_EMAIL,
  },
  security: {
    maxLoginAttempts: Number(import.meta.env.VITE_MAX_LOGIN_ATTEMPTS),
    loginTimeoutMinutes: Number(import.meta.env.VITE_LOGIN_TIMEOUT_MINUTES),
  },
};