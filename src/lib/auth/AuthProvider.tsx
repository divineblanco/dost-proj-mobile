// import React, {
//     createContext,
//     ReactNode,
//     useCallback,
//     useContext,
//     useEffect,
//     useMemo,
//     useState,
// } from "react";

// import {
//     getStorageItem,
//     removeStorageItem,
//     setStorageItem,
// } from "./storage.native";

// export interface AuthSession {
//     token: string;
//     data: {
//         user_id: string;
//         email: string;
//         Profile: {
//             first_name?: string;
//             last_name?: string;
//         };
//         Role: {
//             name: string;
//             permission: unknown;
//         };
//         Organization: {
//             name: string;
//         };
//     };
// }

// interface AuthContextValue {
//     session: AuthSession | null;
//     user: AuthSession["data"] | null;
//     token: string | null;
//     isAuthenticated: boolean;
//     isLoading: boolean;
//     setSession: (
//         session: AuthSession
//     ) => Promise<void>;
//     clearSession: () => Promise<void>;
// }

// const SESSION_KEY = "data_sessions";

// const AuthContext =
//     createContext<AuthContextValue | undefined>(
//         undefined
//     );

// interface AuthProviderProps {
//     children: ReactNode;
// }

// export function AuthProvider({
//     children,
// }: AuthProviderProps) {
//     const [session, setSessionState] =
//         useState<AuthSession | null>(null);

//     const [isLoading, setIsLoading] =
//         useState(true);

//     const loadSession = useCallback(
//         async () => {
//             try {
//                 console.log("[AUTH] Starting loadSession...");

//                 const storedSession =
//   await getStorageItem(SESSION_KEY);

// console.log(
//   "[AUTH] Stored session exists:",
//   Boolean(storedSession)
// );

// if (!storedSession) {
//   setSessionState(null);
//   return;
// }


//                 try {
//                     const parsedSession =
//                         JSON.parse(
//                             storedSession
//                         ) as AuthSession;

//                     if (!parsedSession.token) {
//                         await removeStorageItem(
//                             SESSION_KEY
//                         );

//                         setSessionState(null);
//                         return;
//                     }
//                     console.log(
//   "[AUTH] Restoring stored session..."
// );


//                     setSessionState(
//                         parsedSession
//                     );
//                 } catch {
//                     await removeStorageItem(
//                         SESSION_KEY
//                     );

//                     setSessionState(null);
//                 }
//             } catch {
//                 setSessionState(null);
//             } finally {
//                 console.log(
//   "[AUTH] Auth loading finished"
// );

//                 setIsLoading(false);
//             }
//         },
//         []
//     );

//     useEffect(() => {
//         loadSession();
//     }, [loadSession]);

//     const setSession = useCallback(
//   async (
//     newSession: AuthSession
//   ) => {
//     console.log("[AUTH] Saving session...");
//     console.log("[AUTH] Token exists:", Boolean(newSession.token));

//     await setStorageItem(
//       SESSION_KEY,
//       JSON.stringify(newSession)
//     );

//     console.log("[AUTH] Session saved to storage");

//     setSessionState(newSession);

//     console.log("[AUTH] Session state updated");
//   },
//   []
// );


//     const clearSession = useCallback(async () => {
//         console.log("[AUTH] Clearing session...");

//         await removeStorageItem(SESSION_KEY);

//         console.log("[AUTH] Session removed from storage");

//         setSessionState(null);

//         console.log("[AUTH] Session state set to null");
//     }, []);


//     const value =
//         useMemo<AuthContextValue>(
//             () => ({
//                 session,

//                 user:
//                     session?.data ??
//                     null,

//                 token:
//                     session?.token ??
//                     null,

//                 isAuthenticated:
//                     Boolean(
//                         session?.token
//                     ),

//                 isLoading,

//                 setSession,

//                 clearSession,
//             }),
//             [
//                 session,
//                 isLoading,
//                 setSession,
//                 clearSession,
//             ]
//         );

//     return (
//         <AuthContext.Provider
//             value={value}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// }

// export function useAuth(): AuthContextValue {
//     const context =
//         useContext(AuthContext);

//     if (!context) {
//         throw new Error(
//             "useAuth must be used within an AuthProvider"
//         );
//     }

//     return context;
// }

import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    getStorageItem,
    removeStorageItem,
    setStorageItem,
} from "./storage.native";

export interface AuthSession {
  token: string;
  data: {
    user_id: string;
    email: string;
    Profile: {
      first_name?: string;
      last_name?: string;
    };
    Role: {
      name: string;
      permission: unknown;
    };
    Organization: {
      name: string;
    };
  };
}

interface AuthContextValue {
  session: AuthSession | null;
  user: AuthSession["data"] | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setSession: (
    session: AuthSession
  ) => Promise<void>;
  clearSession: () => Promise<void>;
}

const SESSION_KEY = "data_sessions";

const AuthContext =
  createContext<AuthContextValue | undefined>(
    undefined
  );

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [session, setSessionState] =
    useState<AuthSession | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const loadSession = useCallback(
    async () => {
      try {
        console.log("[AUTH] Starting loadSession...");

        const storedSession =
          await getStorageItem(SESSION_KEY);

        console.log(
          "[AUTH] Stored session exists:",
          Boolean(storedSession)
        );

        if (!storedSession) {
          setSessionState(null);
          return;
        }

        try {
          const parsedSession =
            JSON.parse(
              storedSession
            ) as AuthSession;

          if (!parsedSession.token) {
            await removeStorageItem(
              SESSION_KEY
            );

            setSessionState(null);
            return;
          }

          console.log(
            "[AUTH] Restoring stored session..."
          );

          setSessionState(parsedSession);
        } catch {
          await removeStorageItem(
            SESSION_KEY
          );

          setSessionState(null);
        }
      } catch {
        setSessionState(null);
      } finally {
        console.log(
          "[AUTH] Auth loading finished"
        );

        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  const setSession = useCallback(
    async (
      newSession: AuthSession
    ) => {
      console.log(
        "[AUTH] Saving session..."
      );

      console.log(
        "[AUTH] Token exists:",
        Boolean(newSession.token)
      );

      await setStorageItem(
        SESSION_KEY,
        JSON.stringify(newSession)
      );

      console.log(
        "[AUTH] Session saved to storage"
      );

      setSessionState(newSession);

      console.log(
        "[AUTH] Session state updated"
      );
    },
    []
  );

  const clearSession =
    useCallback(async () => {
      console.log(
        "[AUTH] Clearing session..."
      );

      await removeStorageItem(
        SESSION_KEY
      );

      console.log(
        "[AUTH] Session removed from storage"
      );

      setSessionState(null);

      console.log(
        "[AUTH] Session state set to null"
      );
    }, []);

  const value =
    useMemo<AuthContextValue>(
      () => ({
        session,

        user:
          session?.data ??
          null,

        token:
          session?.token ??
          null,

        isAuthenticated:
          Boolean(
            session?.token
          ),

        isLoading,

        setSession,

        clearSession,
      }),
      [
        session,
        isLoading,
        setSession,
        clearSession,
      ]
    );

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
}
