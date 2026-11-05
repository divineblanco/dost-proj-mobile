// import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
// import { AppState, AppStateStatus } from "react-native";
// import { getStorageItem, removeStorageItem, setStorageItem } from "./storage.native";

// export interface AuthSession {
//   token: string;
//   data: {
//     user_id: string;
//     email: string;
//     Profile: { first_name?: string; last_name?: string; location?: string | null; image_url?: string | null };
//     Role: { name: string; permission: unknown };
//     Organization: { name: string };
//   };
// }

// interface AuthContextValue {
//   session: AuthSession | null;
//   user: AuthSession["data"] | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   timeUntilExpiry: number | null;
//   formattedTimeUntilExpiry: string;
//   setSession: (session: AuthSession) => Promise<void>;
//   clearSession: () => Promise<void>;
// }

// interface AuthProviderProps { children: ReactNode }

// const SESSION_KEY = "data_sessions";
// const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// const getJwtPayload = (token: string): Record<string, unknown> | null => {
//   try {
//     const parts = token.split(".");
//     if (parts.length !== 3) return null;
//     const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
//     const padded = base64.padEnd(base64.length + ((4 - base64.length % 4) % 4), "=");
//     return JSON.parse(atob(padded));
//   } catch (error) {
//     console.error("[AUTH] JWT decode failed:", error);
//     return null;
//   }
// };

// const getTokenExpiration = (token: string): number | null => {
//   const payload = getJwtPayload(token);
//   return payload && typeof payload.exp === "number" ? payload.exp * 1000 : null;
// };

// const isTokenExpired = (token: string): boolean => {
//   const expiresAt = getTokenExpiration(token);
//   return expiresAt === null || expiresAt <= Date.now();
// };

// const formatRemainingTime = (milliseconds: number | null): string => {
//   if (milliseconds === null) return "--:--:--";
//   const totalSeconds = Math.ceil(milliseconds / 1000);
//   if (totalSeconds <= 0) return "00:00:00";
//   const hours = Math.floor(totalSeconds / 3600);
//   const minutes = Math.floor((totalSeconds % 3600) / 60);
//   const seconds = totalSeconds % 60;
//   return [hours, minutes, seconds].map(v => String(v).padStart(2, "0")).join(":");
// };

// export function AuthProvider({ children }: AuthProviderProps) {
//   const [session, setSessionState] = useState<AuthSession | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [timeUntilExpiry, setTimeUntilExpiry] = useState<number | null>(null);
//   const mounted = useRef(true);
//   const sessionRef = useRef<AuthSession | null>(null);

//   const updateSession = useCallback((nextSession: AuthSession | null) => {
//     sessionRef.current = nextSession;
//     if (mounted.current) setSessionState(nextSession);
//   }, []);

//   useEffect(() => {
//     mounted.current = true;
//     return () => { mounted.current = false; };
//   }, []);

//   const clearSession = useCallback(async () => {
//     console.log("[AUTH] Clearing session...");
//     updateSession(null);
//     setTimeUntilExpiry(null);
//     try {
//       await removeStorageItem(SESSION_KEY);
//     } catch (error) {
//       console.error("[AUTH] Failed to remove stored session:", error);
//     }
//   }, [updateSession]);

//   const loadSession = useCallback(async () => {
//     try {
//       const stored = await getStorageItem(SESSION_KEY);
//       if (!stored) { updateSession(null); return; }

//       let parsed: AuthSession;
//       try {
//         parsed = JSON.parse(stored);
//       } catch (error) {
//         console.error("[AUTH] Invalid stored session JSON:", error);
//         await removeStorageItem(SESSION_KEY);
//         updateSession(null);
//         return;
//       }

//       if (!parsed?.token || !parsed?.data?.user_id || isTokenExpired(parsed.token)) {
//         console.log("[AUTH] Stored session is invalid or expired");
//         await removeStorageItem(SESSION_KEY);
//         updateSession(null);
//         return;
//       }

//       console.log("[AUTH] Restoring user:", parsed.data.user_id);
//       updateSession(parsed);
//     } catch (error) {
//       console.error("[AUTH] loadSession failed:", error);
//       updateSession(null);
//     } finally {
//       if (mounted.current) setIsLoading(false);
//     }
//   }, [updateSession]);

//   useEffect(() => { void loadSession(); }, [loadSession]);

//   const setSession = useCallback(async (newSession: AuthSession) => {
//     if (!newSession?.token || !newSession?.data?.user_id) {
//       throw new Error("Cannot save session without token and user_id");
//     }
//     if (isTokenExpired(newSession.token)) {
//       console.error("[AUTH] Cannot save expired or invalid token");
//       await clearSession();
//       return;
//     }
//     await setStorageItem(SESSION_KEY, JSON.stringify(newSession));
//     console.log("[AUTH] Saving authenticated user:", newSession.data.user_id);
//     updateSession(newSession);
//   }, [clearSession, updateSession]);

//   // Live countdown and automatic logout at token expiration.
//   useEffect(() => {
//     const currentToken = session?.token;
//     if (!currentToken) { setTimeUntilExpiry(null); return; }

//     const expiresAt = getTokenExpiration(currentToken);
//     if (expiresAt === null) { void clearSession(); return; }

//     const updateCountdown = () => {
//       if (sessionRef.current?.token !== currentToken) return;
//       const remaining = Math.max(0, expiresAt - Date.now());
//       setTimeUntilExpiry(remaining);
//       if (remaining === 0) {
//         console.log("[AUTH] Token expired - logging out");
//         void clearSession();
//       }
//     };

//     updateCountdown();
//     const interval = setInterval(updateCountdown, 1000);
//     return () => clearInterval(interval);
//   }, [session?.token, clearSession]);

//   // Recheck token when the app returns to the foreground.
//   useEffect(() => {
//     const checkExpiration = (state: AppStateStatus) => {
//       if (state !== "active") return;
//       const currentSession = sessionRef.current;
//       if (currentSession && isTokenExpired(currentSession.token)) {
//         console.log("[AUTH] Expired token detected on app resume");
//         void clearSession();
//       }
//     };
//     const subscription = AppState.addEventListener("change", checkExpiration);
//     checkExpiration(AppState.currentState);
//     return () => subscription.remove();
//   }, [clearSession]);

//   const formattedTimeUntilExpiry = formatRemainingTime(timeUntilExpiry);

//   const value = useMemo<AuthContextValue>(() => ({
//     session,
//     user: session?.data ?? null,
//     token: session?.token ?? null,
//     isAuthenticated: Boolean(session?.token),
//     isLoading,
//     timeUntilExpiry,
//     formattedTimeUntilExpiry,
//     setSession,
//     clearSession,
//   }), [session, isLoading, timeUntilExpiry, formattedTimeUntilExpiry, setSession, clearSession]);

//   console.log("EXPIRE TOKEN:" + formattedTimeUntilExpiry, formatRemainingTime);
//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within an AuthProvider");
//   return context;
// }



// import React, {
//   createContext,
//   ReactNode,
//   useCallback,
//   useContext,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import { AppState, AppStateStatus } from "react-native";
// import AuthNoticeModal, { AuthNotice } from "./AuthNoticeModal";
// import {
//   getStorageItem,
//   removeStorageItem,
//   setStorageItem,
// } from "./storage.native";

// export interface AuthSession {
//   token: string;
//   data: {
//     user_id: string;
//     email: string;
//     Profile: {
//       first_name?: string;
//       last_name?: string;
//       location?: string | null;
//       image_url?: string | null;
//     };
//     Role: { name: string; permission: unknown };
//     Organization: { name: string };
//   };
// }

// interface AuthContextValue {
//   session: AuthSession | null;
//   user: AuthSession["data"] | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   timeUntilExpiry: number | null;
//   formattedTimeUntilExpiry: string;
//   setSession: (session: AuthSession) => Promise<void>;
//   clearSession: (showNotice?: boolean) => Promise<void>;
// }

// interface AuthProviderProps {
//   children: ReactNode;
// }

// const SESSION_KEY = "data_sessions";
// const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// const loginMessages = [
//   {
//     title: "Welcome!",
//     quote: "Every small action can create meaningful change.",
//   },
//   {
//     title: "Ready to Make a Difference?",
//     quote: "Be the reason someone believes in positive change.",
//   },
//   {
//     title: "Your Journey Continues!",
//     quote: "Progress begins when someone chooses to take action.",
//   },
// ];

// const logoutMessages = [
//   {
//     title: "Thank You!",
//     quote: "Your voice matters, even when you step away.",
//   },
//   {
//     title: "Until We Meet Again!",
//     quote: "Small acts of awareness can inspire lasting change.",
//   },
//   {
//     title: "Keep Making a Difference!",
//     quote: "Change begins with people who care enough to act.",
//   },
// ];

// function getRandomMessage(
//   messages: { title: string; quote: string }[],
// ) {
//   return messages[Math.floor(Math.random() * messages.length)];
// }

// const getJwtPayload = (
//   token: string,
// ): Record<string, unknown> | null => {
//   try {
//     const parts = token.split(".");
//     if (parts.length !== 3) return null;

//     const base64 = parts[1]
//       .replace(/-/g, "+")
//       .replace(/_/g, "/");

//     const padded = base64.padEnd(
//       base64.length + ((4 - (base64.length % 4)) % 4),
//       "=",
//     );

//     return JSON.parse(atob(padded));
//   } catch (error) {
//     console.error("[AUTH] JWT decode failed:", error);
//     return null;
//   }
// };

// const getTokenExpiration = (token: string): number | null => {
//   const payload = getJwtPayload(token);
//   return payload && typeof payload.exp === "number"
//     ? payload.exp * 1000
//     : null;
// };

// const isTokenExpired = (token: string): boolean => {
//   const expiresAt = getTokenExpiration(token);
//   return expiresAt === null || expiresAt <= Date.now();
// };

// const formatRemainingTime = (
//   milliseconds: number | null,
// ): string => {
//   if (milliseconds === null) return "--:--:--";

//   const totalSeconds = Math.ceil(milliseconds / 1000);
//   if (totalSeconds <= 0) return "00:00:00";

//   const hours = Math.floor(totalSeconds / 3600);
//   const minutes = Math.floor((totalSeconds % 3600) / 60);
//   const seconds = totalSeconds % 60;

//   return [hours, minutes, seconds]
//     .map((value) => String(value).padStart(2, "0"))
//     .join(":");
// };

// export function AuthProvider({ children }: AuthProviderProps) {
//   const [session, setSessionState] =
//     useState<AuthSession | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [timeUntilExpiry, setTimeUntilExpiry] =
//     useState<number | null>(null);
//   const [notice, setNotice] = useState<AuthNotice | null>(null);

//   const mounted = useRef(true);
//   const sessionRef = useRef<AuthSession | null>(null);

//   const updateSession = useCallback(
//     (nextSession: AuthSession | null) => {
//       sessionRef.current = nextSession;

//       if (mounted.current) {
//         setSessionState(nextSession);
//       }
//     },
//     [],
//   );

//   useEffect(() => {
//     mounted.current = true;

//     return () => {
//       mounted.current = false;
//     };
//   }, []);

//   const clearSession = useCallback(
//     async (showNotice = true) => {
//       const wasAuthenticated = Boolean(
//         sessionRef.current?.token,
//       );

//       console.log("[AUTH] Clearing session...");

//       updateSession(null);
//       setTimeUntilExpiry(null);

//       if (showNotice && wasAuthenticated && mounted.current) {
//         setNotice({
//           type: "logout",
//           ...getRandomMessage(logoutMessages),
//         });
//       }

//       try {
//         await removeStorageItem(SESSION_KEY);
//       } catch (error) {
//         console.error(
//           "[AUTH] Failed to remove stored session:",
//           error,
//         );
//       }
//     },
//     [updateSession],
//   );

//   const loadSession = useCallback(async () => {
//     try {
//       const stored = await getStorageItem(SESSION_KEY);

//       if (!stored) {
//         updateSession(null);
//         return;
//       }

//       let parsed: AuthSession;

//       try {
//         parsed = JSON.parse(stored);
//       } catch (error) {
//         console.error(
//           "[AUTH] Invalid stored session JSON:",
//           error,
//         );
//         await removeStorageItem(SESSION_KEY);
//         updateSession(null);
//         return;
//       }

//       if (
//         !parsed?.token ||
//         !parsed?.data?.user_id ||
//         isTokenExpired(parsed.token)
//       ) {
//         console.log(
//           "[AUTH] Stored session is invalid or expired",
//         );
//         await removeStorageItem(SESSION_KEY);
//         updateSession(null);
//         return;
//       }

//       // Restore the session without showing a login notice.
//       updateSession(parsed);
//     } catch (error) {
//       console.error("[AUTH] loadSession failed:", error);
//       updateSession(null);
//     } finally {
//       if (mounted.current) {
//         setIsLoading(false);
//       }
//     }
//   }, [updateSession]);

//   useEffect(() => {
//     void loadSession();
//   }, [loadSession]);

//   const setSession = useCallback(
//     async (newSession: AuthSession) => {
//       if (!newSession?.token || !newSession?.data?.user_id) {
//         throw new Error(
//           "Cannot save session without token and user_id",
//         );
//       }

//       if (isTokenExpired(newSession.token)) {
//         console.error(
//           "[AUTH] Cannot save expired or invalid token",
//         );
//         await clearSession(false);
//         return;
//       }

//       await setStorageItem(
//         SESSION_KEY,
//         JSON.stringify(newSession),
//       );

//       console.log(
//         "[AUTH] Saving authenticated user:",
//         newSession.data.user_id,
//       );

//       updateSession(newSession);

//       if (mounted.current) {
//         setNotice({
//           type: "login",
//           ...getRandomMessage(loginMessages),
//         });
//       }
//     },
//     [clearSession, updateSession],
//   );

//   // Live countdown and automatic logout at token expiration.
//   useEffect(() => {
//     const currentToken = session?.token;

//     if (!currentToken) {
//       setTimeUntilExpiry(null);
//       return;
//     }

//     const expiresAt = getTokenExpiration(currentToken);

//     if (expiresAt === null) {
//       void clearSession();
//       return;
//     }

//     const updateCountdown = () => {
//       if (sessionRef.current?.token !== currentToken) return;

//       const remaining = Math.max(0, expiresAt - Date.now());
//       setTimeUntilExpiry(remaining);

//       if (remaining === 0) {
//         console.log("[AUTH] Token expired - logging out");
//         void clearSession();
//       }
//     };

//     updateCountdown();

//     const interval = setInterval(updateCountdown, 1000);
//     return () => clearInterval(interval);
//   }, [session?.token, clearSession]);

//   // Recheck token when the app returns to the foreground.
//   useEffect(() => {
//     const checkExpiration = (state: AppStateStatus) => {
//       if (state !== "active") return;

//       const currentSession = sessionRef.current;

//       if (
//         currentSession &&
//         isTokenExpired(currentSession.token)
//       ) {
//         console.log(
//           "[AUTH] Expired token detected on app resume",
//         );
//         void clearSession();
//       }
//     };

//     const subscription = AppState.addEventListener(
//       "change",
//       checkExpiration,
//     );

//     checkExpiration(AppState.currentState);

//     return () => subscription.remove();
//   }, [clearSession]);

//   const formattedTimeUntilExpiry =
//     formatRemainingTime(timeUntilExpiry);

//   const value = useMemo<AuthContextValue>(
//     () => ({
//       session,
//       user: session?.data ?? null,
//       token: session?.token ?? null,
//       isAuthenticated: Boolean(session?.token),
//       isLoading,
//       timeUntilExpiry,
//       formattedTimeUntilExpiry,
//       setSession,
//       clearSession,
//     }),
//     [
//       session,
//       isLoading,
//       timeUntilExpiry,
//       formattedTimeUntilExpiry,
//       setSession,
//       clearSession,
//     ],
//   );

//   return (
//     <AuthContext.Provider value={value}>
//       {children}

//       <AuthNoticeModal
//         notice={notice}
//         onClose={() => setNotice(null)}
//       />
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error(
//       "useAuth must be used within an AuthProvider",
//     );
//   }

//   return context;
// }


import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import AuthNoticeModal, { AuthNotice } from "./AuthNoticeModal";
import { getStorageItem, removeStorageItem, setStorageItem } from "./storage.native";

export interface AuthSession {
  token: string;
  data: {
    user_id: string;
    email: string;
    Profile: { first_name?: string; last_name?: string; location?: string | null; image_url?: string | null };
    Role: { name: string; permission: unknown };
    Organization: { name: string };
  };
}

interface AuthContextValue {
  session: AuthSession | null;
  user: AuthSession["data"] | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  timeUntilExpiry: number | null;
  formattedTimeUntilExpiry: string;
  setSession: (session: AuthSession) => Promise<void>;
  clearSession: (showNotice?: boolean) => Promise<void>;
  showLoginNotice: () => void;
}

interface AuthProviderProps { children: ReactNode }

const SESSION_KEY = "data_sessions";
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const loginMessages = [
  { title: "Welcome!", quote: "Every small action can create meaningful change." },
  { title: "Ready to Make a Difference?", quote: "Be the reason someone believes in positive change." },
  { title: "Your Journey Continues!", quote: "Progress begins when someone chooses to take action." },
];

const logoutMessages = [
  { title: "Thank You!", quote: "Your voice matters, even when you step away." },
  { title: "Until We Meet Again!", quote: "Small acts of awareness can inspire lasting change." },
  { title: "Keep Making a Difference!", quote: "Change begins with people who care enough to act." },
];

function getRandomMessage(messages: { title: string; quote: string }[]) {
  return messages[Math.floor(Math.random() * messages.length)];
}

const getJwtPayload = (token: string): Record<string, unknown> | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    return JSON.parse(atob(padded));
  } catch (error) {
    console.error("[AUTH] JWT decode failed:", error);
    return null;
  }
};

const getTokenExpiration = (token: string): number | null => {
  const payload = getJwtPayload(token);
  return payload && typeof payload.exp === "number" ? payload.exp * 1000 : null;
};

const isTokenExpired = (token: string): boolean => {
  const expiresAt = getTokenExpiration(token);
  return expiresAt === null || expiresAt <= Date.now();
};

const formatRemainingTime = (milliseconds: number | null): string => {
  if (milliseconds === null) return "--:--:--";
  const totalSeconds = Math.ceil(milliseconds / 1000);
  if (totalSeconds <= 0) return "00:00:00";
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map(value => String(value).padStart(2, "0")).join(":");
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSessionState] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeUntilExpiry, setTimeUntilExpiry] = useState<number | null>(null);
  const [notice, setNotice] = useState<AuthNotice | null>(null);
  const mounted = useRef(true);
  const sessionRef = useRef<AuthSession | null>(null);

  const updateSession = useCallback((nextSession: AuthSession | null) => {
    sessionRef.current = nextSession;
    if (mounted.current) setSessionState(nextSession);
  }, []);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  const showLoginNotice = useCallback(() => {
    if (mounted.current) setNotice({ type: "login", ...getRandomMessage(loginMessages) });
  }, []);

  const clearSession = useCallback(async (showNotice = true) => {
    const wasAuthenticated = Boolean(sessionRef.current?.token);
    console.log("[AUTH] Clearing session...");
    updateSession(null);
    setTimeUntilExpiry(null);
    if (showNotice && wasAuthenticated && mounted.current) {
      setNotice({ type: "logout", ...getRandomMessage(logoutMessages) });
    }
    try {
      await removeStorageItem(SESSION_KEY);
    } catch (error) {
      console.error("[AUTH] Failed to remove stored session:", error);
    }
  }, [updateSession]);

  const loadSession = useCallback(async () => {
    try {
      const stored = await getStorageItem(SESSION_KEY);
      if (!stored) { updateSession(null); return; }
      let parsed: AuthSession;
      try {
        parsed = JSON.parse(stored);
      } catch (error) {
        console.error("[AUTH] Invalid stored session JSON:", error);
        await removeStorageItem(SESSION_KEY);
        updateSession(null);
        return;
      }
      if (!parsed?.token || !parsed?.data?.user_id || isTokenExpired(parsed.token)) {
        console.log("[AUTH] Stored session is invalid or expired");
        await removeStorageItem(SESSION_KEY);
        updateSession(null);
        return;
      }
      updateSession(parsed);
    } catch (error) {
      console.error("[AUTH] loadSession failed:", error);
      updateSession(null);
    } finally {
      if (mounted.current) setIsLoading(false);
    }
  }, [updateSession]);

  useEffect(() => { void loadSession(); }, [loadSession]);

  const setSession = useCallback(async (newSession: AuthSession) => {
    if (!newSession?.token || !newSession?.data?.user_id) throw new Error("Cannot save session without token and user_id");
    if (isTokenExpired(newSession.token)) {
      console.error("[AUTH] Cannot save expired or invalid token");
      await clearSession(false);
      return;
    }
    await setStorageItem(SESSION_KEY, JSON.stringify(newSession));
    console.log("[AUTH] Saving authenticated user:", newSession.data.user_id);
    updateSession(newSession);
    // Do not show the login notice here. The Home page will trigger it after Sign In.
  }, [clearSession, updateSession]);

  useEffect(() => {
    const currentToken = session?.token;
    if (!currentToken) { setTimeUntilExpiry(null); return; }
    const expiresAt = getTokenExpiration(currentToken);
    if (expiresAt === null) { void clearSession(); return; }
    const updateCountdown = () => {
      if (sessionRef.current?.token !== currentToken) return;
      const remaining = Math.max(0, expiresAt - Date.now());
      setTimeUntilExpiry(remaining);
      if (remaining === 0) { console.log("[AUTH] Token expired - logging out"); void clearSession(); }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [session?.token, clearSession]);

  useEffect(() => {
    const checkExpiration = (state: AppStateStatus) => {
      if (state !== "active") return;
      const currentSession = sessionRef.current;
      if (currentSession && isTokenExpired(currentSession.token)) {
        console.log("[AUTH] Expired token detected on app resume");
        void clearSession();
      }
    };
    const subscription = AppState.addEventListener("change", checkExpiration);
    checkExpiration(AppState.currentState);
    return () => subscription.remove();
  }, [clearSession]);

  const formattedTimeUntilExpiry = formatRemainingTime(timeUntilExpiry);
  const value = useMemo<AuthContextValue>(() => ({
    session, user: session?.data ?? null, token: session?.token ?? null,
    isAuthenticated: Boolean(session?.token), isLoading, timeUntilExpiry,
    formattedTimeUntilExpiry, setSession, clearSession, showLoginNotice,
  }), [session, isLoading, timeUntilExpiry, formattedTimeUntilExpiry, setSession, clearSession, showLoginNotice]);

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthNoticeModal notice={notice} onClose={() => setNotice(null)} />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}