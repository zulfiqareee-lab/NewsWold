import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, loginWithGoogle, logoutUser } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  adminEmail: string;
  loading: boolean;
  loginWithGoogleAuth: () => Promise<void>;
  loginWithPassword: (pass: string) => boolean;
  logout: () => Promise<void>;
}

const ADMIN_EMAIL = 'zulfiqareee@gmail.com';
const ADMIN_STORAGE_KEY = 'nw_admin_session_auth';

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  adminEmail: ADMIN_EMAIL,
  loading: false,
  loginWithGoogleAuth: async () => {},
  loginWithPassword: () => false,
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [passwordSessionValid, setPasswordSessionValid] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
      return stored === 'authenticated_admin_ok';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogleAuth = async () => {
    try {
      const result = await loginWithGoogle();
      if (result.user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
        setPasswordSessionValid(true);
        localStorage.setItem(ADMIN_STORAGE_KEY, 'authenticated_admin_ok');
      }
    } catch (err: any) {
      console.error('Google Sign-In failed:', err);
      throw err;
    }
  };

  const loginWithPassword = (pass: string): boolean => {
    // Master admin credentials for owner (zulfiqareee@gmail.com)
    // Accepts 'admin1234' or 'newsworld2026' or email username
    const validPasswords = ['admin1234', 'newsworld2026', 'zulfiqar2026'];
    if (validPasswords.includes(pass.trim())) {
      setPasswordSessionValid(true);
      try {
        localStorage.setItem(ADMIN_STORAGE_KEY, 'authenticated_admin_ok');
      } catch (e) {
        console.warn('LocalStorage error:', e);
      }
      return true;
    }
    return false;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (err: any) {
      console.warn('Firebase logout warning:', err);
    }
    setPasswordSessionValid(false);
    try {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    } catch (e) {
      console.warn('LocalStorage clear error:', e);
    }
  };

  const isGoogleAdmin = Boolean(user && user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase());
  const isAdmin = isGoogleAdmin || passwordSessionValid;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        adminEmail: ADMIN_EMAIL,
        loading,
        loginWithGoogleAuth,
        loginWithPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
