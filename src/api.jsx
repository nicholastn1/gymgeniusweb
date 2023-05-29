export const API_URL = 'https://gymgeniusapi.onrender.com';

// export function SIGNUP_POST(body) {
//   return {
//     url: API_URL + '/signup',
//     options: {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(body),
//     },
//   };
// }

export function LOGIN_POST(body) {
  return {
    url: API_URL + '/login',
    options: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  };
}

export function USER_GET(token) {
  return {
    url: API_URL + '/current_user',
    options: {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    },
  };
}

export function USER_POST(body) {
  return {
    url: API_URL + '/signup',
    options: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  };
}
