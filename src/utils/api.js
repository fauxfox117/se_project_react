const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.sbolin.crabdance.com"
    : "http://localhost:3001";

const headers = { "Content-Type": "application/json" };

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getItems = () => {
  return fetch(`${baseUrl}/items`, { headers }).then(handleServerResponse);
};

export const addItem = ({ name, imageUrl, weather }, token) => {
  const authHeaders = token
    ? { ...headers, authorization: `Bearer ${token}` }
    : headers;
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(handleServerResponse);
};

export const removeItem = (itemId, token) => {
  const authHeaders = token
    ? { ...headers, authorization: `Bearer ${token}` }
    : headers;
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: authHeaders,
  }).then((res) => {
    return handleServerResponse(res);
  });
};

export const addCardLike = (id, token) => {
  const authHeaders = token
    ? { ...headers, authorization: `Bearer ${token}` }
    : headers;
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: authHeaders,
  }).then(handleServerResponse);
};

export const removeCardLike = (id, token) => {
  const authHeaders = token
    ? { ...headers, authorization: `Bearer ${token}` }
    : headers;
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: authHeaders,
  }).then(handleServerResponse);
};
