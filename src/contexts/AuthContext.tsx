import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, loginWithGoogle, logoutUser } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  bypassDevAdmin: () => void;
}

const ADMIN_EMAIL = 'zulfiqareee@gmail.com';

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: true, // Default accessible in preview
  loading: false,
  login: async () => {},
  logout: async () => {},
  bypassDevAdmin: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [devAdminOverride, setDevAdminOverride] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await loginWithGoogle();
    } catch (err: any) {
      console.error('Google Sign-In failed:', err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setDevAdminOverride(false);
    } catch (err: any) {
      console.error('Sign-Out failed:', err);
    }
  };

  const bypassDevAdmin = () => {
    setDevAdminOverride(true);
  };

  const isAdmin = devAdminOverride || (user?.email === ADMIN_EMAIL);

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, login, logout, bypassDevAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
