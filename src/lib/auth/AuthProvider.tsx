import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { getStorageItem, removeStorageItem, setStorageItem } from "./storage.native";

export interface AuthSession {
  token:string;
  data:{
    user_id:string;
    email:string;
    Profile:{first_name?:string;last_name?:string};
    Role:{name:string;permission:unknown};
    Organization:{name:string};
  };
}

interface AuthContextValue {
  session:AuthSession|null;
  user:AuthSession["data"]|null;
  token:string|null;
  isAuthenticated:boolean;
  isLoading:boolean;
  setSession:(session:AuthSession)=>Promise<void>;
  clearSession:()=>Promise<void>;
}

interface AuthProviderProps {
  children:ReactNode;
}

const SESSION_KEY="data_sessions";
const AuthContext=createContext<AuthContextValue|undefined>(undefined);

const getJwtPayload=(token:string):Record<string,any>|null=>{
  try{
    const parts=token.split(".");
    if(parts.length!==3)return null;
    const base64=parts[1].replace(/-/g,"+").replace(/_/g,"/");
    const padded=base64.padEnd(base64.length+((4-base64.length%4)%4),"=");
    return JSON.parse(atob(padded));
  }catch(error){
    console.error("[AUTH] JWT decode failed:",error);
    return null;
  }
};

const isTokenExpired=(token:string)=>{
  const payload=getJwtPayload(token);
  if(!payload)return true;
  if(typeof payload.exp!=="number")return false;
  return payload.exp*1000<=Date.now();
};

export function AuthProvider({children}:AuthProviderProps){
  const [session,setSessionState]=useState<AuthSession|null>(null);
  const [isLoading,setIsLoading]=useState(true);
  const mounted=useRef(true);

  useEffect(()=>{
    mounted.current=true;
    return()=>{
      mounted.current=false;
    };
  },[]);

  const loadSession=useCallback(async()=>{
    console.log("[AUTH] Loading stored session...");

    try{
      const stored=await getStorageItem(SESSION_KEY);

      console.log("[AUTH] Stored session exists:",!!stored);

      if(!stored){
        if(mounted.current)setSessionState(null);
        return;
      }

      let parsed:AuthSession;

      try{
        parsed=JSON.parse(stored);
      }catch(error){
        console.error("[AUTH] Invalid stored JSON");
        await removeStorageItem(SESSION_KEY);
        if(mounted.current)setSessionState(null);
        return;
      }

      if(!parsed?.token){
        console.log("[AUTH] Stored session has no token");
        await removeStorageItem(SESSION_KEY);
        if(mounted.current)setSessionState(null);
        return;
      }

      if(isTokenExpired(parsed.token)){
        console.log("[AUTH] Stored token expired");
        await removeStorageItem(SESSION_KEY);
        if(mounted.current)setSessionState(null);
        return;
      }

      console.log("[AUTH] Restoring valid session");

      if(mounted.current){
        setSessionState(parsed);
      }
    }catch(error){
      console.error("[AUTH] loadSession failed:",error);

      if(mounted.current){
        setSessionState(null);
      }
    }finally{
      if(mounted.current){
        setIsLoading(false);
      }
    }
  },[]);

  useEffect(()=>{
    loadSession();
  },[loadSession]);

  const setSession=useCallback(async(newSession:AuthSession)=>{
    console.log("[AUTH] ===== SET SESSION =====");

    if(!newSession?.token){
      throw new Error("Cannot save session without token");
    }

    if(isTokenExpired(newSession.token)){
      console.log("[AUTH] Token already expired");
      await removeStorageItem(SESSION_KEY);
      setSessionState(null);
      return;
    }

    await setStorageItem(
      SESSION_KEY,
      JSON.stringify(newSession)
    );

    console.log("[AUTH] Session written to storage");

    if(mounted.current){
      setSessionState(newSession);
    }

    console.log("[AUTH] Session state updated");
  },[]);

  const clearSession=useCallback(async()=>{
    console.log("[AUTH] clearSession()");

    await removeStorageItem(SESSION_KEY);
    setSessionState(null);
  },[]);

  useEffect(()=>{
    if(!session?.token)return;

    const payload=getJwtPayload(session.token);

    if(!payload){
      clearSession();
      return;
    }

    if(typeof payload.exp!=="number")return;

    const remaining=payload.exp*1000-Date.now();

    if(remaining<=0){
      clearSession();
      return;
    }

    const timer=setTimeout(()=>{
      console.log("[AUTH] Token expired");
      clearSession();
    },remaining);

    return()=>clearTimeout(timer);
  },[session?.token,clearSession]);

  const value=useMemo<AuthContextValue>(()=>({
    session,
    user:session?.data??null,
    token:session?.token??null,
    isAuthenticated:Boolean(session?.token),
    isLoading,
    setSession,
    clearSession,
  }),[session,isLoading,setSession,clearSession]);

  return(
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){
  const context=useContext(AuthContext);

  if(!context){
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}




// function jwtDecode<T>(token: string) {
//   throw new Error("Function not implemented.");
// }
/*THE RIGHT ONE*/

// import React, {
//   createContext,
//   ReactNode,
//   useCallback,
//   useContext,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
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
//     };
//     Role: {
//       name: string;
//       permission: unknown;
//     };
//     Organization: {
//       name: string;
//     };
//   };
// }

// interface AuthContextValue {
//   session: AuthSession | null;
//   user: AuthSession["data"] | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   setSession: (session: AuthSession) => Promise<void>;
//   clearSession: () => Promise<void>;
// }

// interface AuthProviderProps {
//   children: ReactNode;
// }

// const SESSION_KEY = "data_sessions";
// const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// const isTokenExpired = (token: string): boolean => {
//   try {
//     const parts = token.split(".");
//     if (parts.length !== 3) {
//       console.log("[AUTH] Invalid JWT format");
//       return true;
//     }

//     const payload = JSON.parse(atob(parts[1]));
//     if (!payload.exp) {
//       console.log("[AUTH] JWT does not contain exp claim");
//       return false;
//     }

//     return payload.exp * 1000 <= Date.now();
//   } catch (error) {
//     console.error("[AUTH] Failed to decode JWT:", error);
//     return true;
//   }
// };

// export function AuthProvider({ children }: AuthProviderProps) {
//   const [session, setSessionState] = useState<AuthSession | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const loadSession = useCallback(async () => {
//     try {
//       console.log("[AUTH] Starting loadSession...");

//       const storedSession = await getStorageItem(SESSION_KEY);
//       console.log("[AUTH] Stored session exists:", Boolean(storedSession));

//       if (!storedSession) {
//         setSessionState(null);
//         return;
//       }

//       try {
//         const parsedSession = JSON.parse(storedSession) as AuthSession;

//         if (!parsedSession.token) {
//           console.log("[AUTH] No token found");
//           await removeStorageItem(SESSION_KEY);
//           setSessionState(null);
//           return;
//         }

//         if (isTokenExpired(parsedSession.token)) {
//           console.log("[AUTH] Stored token has expired.");
//           await removeStorageItem(SESSION_KEY);
//           setSessionState(null);
//           return;
//         }

//         console.log("[AUTH] Restoring valid session...");
//         setSessionState(parsedSession);
//       } catch (error) {
//         console.error("[AUTH] Invalid stored session:", error);
//         await removeStorageItem(SESSION_KEY);
//         setSessionState(null);
//       }
//     } catch (error) {
//       console.error("[AUTH] Failed to load session:", error);
//       setSessionState(null);
//     } finally {
//       console.log("[AUTH] Auth loading finished");
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadSession();
//   }, [loadSession]);

//   const setSession = useCallback(async (newSession: AuthSession) => {
//     console.log("[AUTH] Saving session...");
//     console.log("[AUTH] Token exists:", Boolean(newSession.token));

//     if (isTokenExpired(newSession.token)) {
//       console.log("[AUTH] Token is already expired.");
//       await removeStorageItem(SESSION_KEY);
//       setSessionState(null);
//       return;
//     }

//     await setStorageItem(SESSION_KEY, JSON.stringify(newSession));
//     console.log("[AUTH] Session saved to storage");

//     setSessionState(newSession);
//     console.log("[AUTH] Session state updated");
//   }, []);

//   const clearSession = useCallback(async () => {
//     console.log("[AUTH] Clearing session...");

//     try {
//       await removeStorageItem(SESSION_KEY);
//       console.log("[AUTH] Session removed from storage");
//     } catch (error) {
//       console.error("[AUTH] Failed to remove session:", error);
//     } finally {
//       setSessionState(null);
//       console.log("[AUTH] Session state set to null");
//     }
//   }, []);

//   useEffect(() => {
//     if (!session?.token) return;

//     try {
//       const parts = session.token.split(".");

//       if (parts.length !== 3) {
//         console.log("[AUTH] Invalid token. Signing out...");
//         clearSession();
//         return;
//       }

//       const payload = JSON.parse(atob(parts[1]));

//       if (!payload.exp) {
//         console.log("[AUTH] Token has no exp claim.");
//         return;
//       }

//       const expirationTime = payload.exp * 1000;
//       const remainingTime = expirationTime - Date.now();

//       console.log(
//         "[AUTH] Token expires at:",
//         new Date(expirationTime).toString()
//       );
//       console.log(
//         "[AUTH] Token remaining:",
//         Math.round(remainingTime / 1000),
//         "seconds"
//       );

//       if (remainingTime <= 0) {
//         console.log("[AUTH] Token already expired.");
//         clearSession();
//         return;
//       }

//       const timer = setTimeout(() => {
//         console.log("[AUTH] Token expired! Automatically signing out...");
//         clearSession();
//       }, remainingTime);

//       return () => {
//         console.log("[AUTH] Clearing expiration timer");
//         clearTimeout(timer);
//       };
//     } catch (error) {
//       console.error("[AUTH] Token expiration error:", error);
//       clearSession();
//     }
//   }, [session?.token, clearSession]);

//   const value = useMemo<AuthContextValue>(
//     () => ({
//       session,
//       user: session?.data ?? null,
//       token: session?.token ?? null,
//       isAuthenticated: Boolean(session?.token),
//       isLoading,
//       setSession,
//       clearSession,
//     }),
//     [session, isLoading, setSession, clearSession]
//   );

//   return (
//     <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
//   );
// }

// export function useAuth(): AuthContextValue {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }

//   return context;
// }