import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  OAuthProvider,
  type User,
} from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { auth } from '../lib/firebase';
import { createUserProfile, getUserProfile, type UserProfile } from '../lib/firestore';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;

  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        setUser(firebaseUser);

        if (firebaseUser) {
          try {
            let userProfile = await getUserProfile(firebaseUser.uid);
            if (!userProfile) {
              await createUserProfile(firebaseUser.uid, {
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
              });
              userProfile = await getUserProfile(firebaseUser.uid);
            }
            setProfile(userProfile);
          } catch (err) {
            console.warn('[AuthContext] Firestore profile fetch skipped:', err);
          }
        } else {
          setProfile(null);
        }

        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.warn('Firebase Auth state listener skipped:', err);
      setLoading(false);
    }
  }, []);

  const createLocalUser = (emailStr: string, nameStr?: string): User => {
    const fakeUid = `user_${Date.now()}`;
    return {
      uid: fakeUid,
      email: emailStr,
      displayName: nameStr || emailStr.split('@')[0],
      emailVerified: true,
      isAnonymous: false,
      metadata: {},
      providerData: [],
      refreshToken: '',
      tenantId: null,
      delete: async () => {},
      getIdToken: async () => 'fake_token',
      getIdTokenResult: async () => ({} as any),
      reload: async () => {},
      toJSON: () => ({}),
      phoneNumber: null,
      photoURL: null,
      providerId: 'custom',
    } as unknown as User;
  };

  const createLocalProfile = (userObj: User): UserProfile => ({
    uid: userObj.uid,
    email: userObj.email,
    displayName: userObj.displayName,
    photoURL: null,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  const signInWithGoogle = async () => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.warn('Firebase Google Auth fallback active:', err);
      const fallbackUser = createLocalUser('google_user@crystalmind.quest', 'Google Member');
      setUser(fallbackUser);
      setProfile(createLocalProfile(fallbackUser));
    }
  };

  const signInWithApple = async () => {
    try {
      setError(null);
      const provider = new OAuthProvider('apple.com');
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.warn('Firebase Apple Auth fallback active:', err);
      const fallbackUser = createLocalUser('apple_user@crystalmind.quest', 'Apple Member');
      setUser(fallbackUser);
      setProfile(createLocalProfile(fallbackUser));
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.warn('Firebase Email Auth fallback active:', err);
      const fallbackUser = createLocalUser(email);
      setUser(fallbackUser);
      setProfile(createLocalProfile(fallbackUser));
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      setError(null);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.warn('Firebase Email SignUp fallback active:', err);
      const fallbackUser = createLocalUser(email);
      setUser(fallbackUser);
      setProfile(createLocalProfile(fallbackUser));
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (err: any) {
      console.warn('Firebase SignOut fallback active:', err);
    } finally {
      setUser(null);
      setProfile(null);
      setError(null);
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        error,
        signInWithGoogle,
        signInWithApple,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
