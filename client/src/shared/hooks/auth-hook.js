import { useCallback, useEffect, useState } from 'react';

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  // Login method.
  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);

    // Set token expiration date to one hour from now (1000ms * 60sec * 60min)
    const tokenExpDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

    setTokenExpirationDate(tokenExpDate);
    localStorage.setItem('userData', JSON.stringify({ userId: uid, token, expiration: tokenExpDate.toISOString() }));
  }, []);

  // Logout method.
  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  // Set a timer to log us out when token expires.
  useEffect(() => {
    if (token && tokenExpirationDate) {
      // Calculate the remaining time before token expiration.
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  // Auto login if we have stored token.
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    // Check for token and also if expiration date is in the future.
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  return { token, userId, login, logout };
};
