export function recordOfTokenInLocalStorage(token, rememberMe) {
  if (rememberMe === true) {
    localStorage.setItem("token", token);
  } else {
    sessionStorage.setItem("token", token);
  }
}

export function deleteTokenInLocalStorage() {
  localStorage.clear();
  sessionStorage.clear();
}
