interface SessionStore {
  [key: string]: object,
}

const sessionStore: SessionStore = {};

export function isAuthenticated(jti: string) {
  return Reflect.has(sessionStore, jti);
}

export function addSession(jti: string) {
  if (!isAuthenticated(jti)) {
    sessionStore[jti] = null;
  }
}

export function removeSession(jti: string) {
  if (isAuthenticated(jti)) {
    delete sessionStore[jti];
  }
}
