import React, { createContext, useContext, useEffect, useState } from 'react';
import { getFirebase } from '../lib/firebase';
import { UserProfile, UserRole } from '../types';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  isBroker: boolean;
  isSeller: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
  isBroker: false,
  isSeller: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const firebase = await getFirebase();
      if (!firebase) {
        setLoading(false);
        return;
      }

      return onAuthStateChanged(firebase.auth, async (user) => {
        setUser(user);
        if (user) {
          const docRef = doc(firebase.db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProfile(docSnap.data() as UserProfile);
          }
        } else {
          setProfile(null);
        }
        setLoading(false);
      });
    };

    const unsubscribe = initAuth();
    return () => {
      unsubscribe.then(unsub => unsub?.());
    };
  }, []);

  const value = {
    user,
    profile,
    loading,
    isAdmin: profile?.role === UserRole.SUPER_ADMIN || profile?.role === UserRole.ADMIN_OPERATIONAL,
    isBroker: profile?.role === UserRole.BROKER,
    isSeller: profile?.role === UserRole.SELLER,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
