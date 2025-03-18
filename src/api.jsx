export const API_URL = import.meta.env.VITE_API_URL;

export function LOGIN_POST(body) {
  return {
    url: API_URL + "/api/v1/login",
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  };
}

export function USER_GET(token) {
  return {
    url: API_URL + "/api/v1/current_user",
    options: {
      method: "GET",
      headers: {
        Authorization: token,
      },
    },
  };
}

export function USER_POST(body) {
  return {
    url: API_URL + "/api/v1/signup",
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  };
}

export function FORGOT_PASSWORD(body) {
  return {
    url: API_URL + "/api/v1/password/forgot",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function RESET_PASSWORD(body) {
  return {
    url: API_URL + "/api/v1/password/reset",
    options: {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function USER_UPDATE(body, token) {
  return {
    url: API_URL + "/api/v1/users",
    options: {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function USER_PREFERENCES_UPDATE(body, token) {
  return {
    url: API_URL + "/api/v1/user/preferences",
    options: {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    },
  };
}
