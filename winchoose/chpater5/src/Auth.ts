const TOKEN_KEY = "chapter5_access_token";
const MOCK_ACCESS_TOKEN = "mission-1-access-token";

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function saveMockAccessToken() {
  localStorage.setItem(TOKEN_KEY, MOCK_ACCESS_TOKEN);
  return MOCK_ACCESS_TOKEN;
}

export function removeAccessToken() {
  localStorage.removeItem(TOKEN_KEY);
}
