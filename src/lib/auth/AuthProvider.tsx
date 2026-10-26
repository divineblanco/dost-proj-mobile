// import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
// import { getStorageItem, removeStorageItem, setStorageItem } from "./storage.native";

// export interface AuthSession{
//   token:string;
//   data:{
//     user_id:string;
//     email:string;
//     Profile:{first_name?:string;last_name?:string};
//     Role:{name:string;permission:unknown};
//     Organization:{name:string};
//   };
// }

// interface AuthContextValue{
//   session:AuthSession|null;
//   user:AuthSession["data"]|null;
//   token:string|null;
//   isAuthenticated:boolean;
//   isLoading:boolean;
//   setSession:(session:AuthSession)=>Promise<void>;
//   clearSession:()=>Promise<void>;
// }

// interface AuthProviderProps{
//   children:ReactNode;
// }

// const SESSION_KEY="data_sessions";
// const AuthContext=createContext<AuthContextValue|undefined>(undefined);

// const getJwtPayload=(token:string):Record<string,any>|null=>{
//   try{
//     const parts=token.split(".");
//     if(parts.length!==3)return null;

//     const base64=parts[1].replace(/-/g,"+").replace(/_/g,"/");
//     const padded=base64.padEnd(
//       base64.length+((4-base64.length%4)%4),
//       "="
//     );

//     return JSON.parse(atob(padded));
//   }catch(error){
//     console.error("[AUTH] JWT decode failed:",error);
//     return null;
//   }
// };

// const getTokenExpiration=(token:string)=>{
//   const payload=getJwtPayload(token);

//   if(!payload||typeof payload.exp!=="number"){
//     return null;
//   }

//   return new Date(payload.exp*1000);
// };

// const isTokenExpired=(token:string)=>{
//   const payload=getJwtPayload(token);

//   if(!payload)return true;

//   if(typeof payload.exp!=="number"){
//     return false;
//   }

//   return payload.exp*1000<=Date.now();
// };

// export function AuthProvider({children}:AuthProviderProps){
//   const[session,setSessionState]=useState<AuthSession|null>(null);
//   const[isLoading,setIsLoading]=useState(true);
//   const mounted=useRef(true);

//   useEffect(()=>{
//     mounted.current=true;

//     return()=>{
//       mounted.current=false;
//     };
//   },[]);

//   const loadSession=useCallback(async()=>{
//     console.log("[AUTH] Loading stored session...");

//     try{
//       const stored=await getStorageItem(SESSION_KEY);

//       console.log("[AUTH] Stored session exists:",!!stored);

//       if(!stored){
//         if(mounted.current)setSessionState(null);
//         return;
//       }

//       let parsed:AuthSession;

//       try{
//         parsed=JSON.parse(stored);
//       }catch(error){
//         console.error("[AUTH] Invalid stored JSON:",error);

//         await removeStorageItem(SESSION_KEY);

//         if(mounted.current)setSessionState(null);

//         return;
//       }

//       console.log("[AUTH] Stored user ID:",parsed?.data?.user_id);
//       console.log("[AUTH] Token exists:",!!parsed?.token);

//       if(!parsed?.token){
//         console.log("[AUTH] Stored session has no token");

//         await removeStorageItem(SESSION_KEY);

//         if(mounted.current)setSessionState(null);

//         return;
//       }

//       const payload=getJwtPayload(parsed.token);

//       if(!payload){
//         console.log("[AUTH] Unable to decode stored token");

//         await removeStorageItem(SESSION_KEY);

//         if(mounted.current)setSessionState(null);

//         return;
//       }

//       if(typeof payload.exp==="number"){
//         const expirationDate=new Date(payload.exp*1000);

//         console.log(
//           "[AUTH] Token expires:",
//           expirationDate.toLocaleString()
//         );
//       }

//       if(isTokenExpired(parsed.token)){
//         console.log("[AUTH] Stored token expired");

//         await removeStorageItem(SESSION_KEY);

//         if(mounted.current)setSessionState(null);

//         return;
//       }

//       console.log("[AUTH] Restoring valid session");

//       if(mounted.current){
//         setSessionState(parsed);
//       }
//     }catch(error){
//       console.error("[AUTH] loadSession failed:",error);

//       if(mounted.current){
//         setSessionState(null);
//       }
//     }finally{
//       if(mounted.current){
//         setIsLoading(false);
//       }
//     }
//   },[]);

//   useEffect(()=>{
//     loadSession();
//   },[loadSession]);

//   const setSession=useCallback(async(newSession:AuthSession)=>{
//     console.log("[AUTH] ===== SET SESSION =====");

//     if(!newSession?.token){
//       throw new Error("Cannot save session without token");
//     }

//     if(isTokenExpired(newSession.token)){
//       console.log("[AUTH] Token already expired");

//       await removeStorageItem(SESSION_KEY);

//       if(mounted.current){
//         setSessionState(null);
//       }

//       return;
//     }

//     const expiration=getTokenExpiration(newSession.token);

//     if(expiration){
//       console.log(
//         "[AUTH] New token expires:",
//         expiration.toLocaleString()
//       );
//     }

//     await setStorageItem(
//       SESSION_KEY,
//       JSON.stringify(newSession)
//     );

//     console.log(
//       "[AUTH] Session written to storage for user:",
//       newSession.data?.user_id
//     );

//     if(mounted.current){
//       setSessionState(newSession);
//     }
//   },[]);

//   const clearSession=useCallback(async()=>{
//     console.log("[AUTH] clearSession()");

//     await removeStorageItem(SESSION_KEY);

//     if(mounted.current){
//       setSessionState(null);
//     }
//   },[]);

//   useEffect(()=>{
//     if(!session?.token)return;

//     const payload=getJwtPayload(session.token);

//     if(!payload){
//       clearSession();
//       return;
//     }

//     if(typeof payload.exp!=="number"){
//       return;
//     }

//     const expirationTime=payload.exp*1000;
//     const remaining=expirationTime-Date.now();

//     console.log(
//       "[AUTH] Active token expires:",
//       new Date(expirationTime).toLocaleString()
//     );

//     if(remaining<=0){
//       console.log("[AUTH] Token already expired");

//       clearSession();

//       return;
//     }

//     const timer=setTimeout(()=>{
//       console.log(
//         "[AUTH] Token expired:",
//         new Date().toLocaleString()
//       );

//       clearSession();
//     },remaining);

//     return()=>{
//       clearTimeout(timer);
//     };
//   },[session?.token,clearSession]);

//   const value=useMemo<AuthContextValue>(()=>({
//     session,
//     user:session?.data??null,
//     token:session?.token??null,
//     isAuthenticated:Boolean(session?.token),
//     isLoading,
//     setSession,
//     clearSession,
//   }),[
//     session,
//     isLoading,
//     setSession,
//     clearSession,
//   ]);

//   return(
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth(){
//   const context=useContext(AuthContext);

//   if(!context){
//     throw new Error(
//       "useAuth must be used within an AuthProvider"
//     );
//   }

//   return context;
// }


// import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
// import { getStorageItem, removeStorageItem, setStorageItem } from "./storage.native";

// export interface AuthSession{
//   token:string;
//   data:{
//     user_id:string;
//     email:string;
//     Profile:{first_name?:string;last_name?:string;location?:string|null;image_url?:string|null};
//     Role:{name:string;permission:unknown};
//     Organization:{name:string};
//   };
// }

// interface AuthContextValue{
//   session:AuthSession|null;
//   user:AuthSession["data"]|null;
//   token:string|null;
//   isAuthenticated:boolean;
//   isLoading:boolean;
//   setSession:(session:AuthSession)=>Promise<void>;
//   clearSession:()=>Promise<void>;
// }

// interface AuthProviderProps{children:ReactNode}

// const SESSION_KEY="data_sessions";
// const AuthContext=createContext<AuthContextValue|undefined>(undefined);

// const getJwtPayload=(token:string):Record<string,any>|null=>{
//   try{
//     const parts=token.split(".");
//     if(parts.length!==3)return null;
//     const base64=parts[1].replace(/-/g,"+").replace(/_/g,"/");
//     const padded=base64.padEnd(base64.length+((4-base64.length%4)%4),"=");
//     return JSON.parse(atob(padded));
//   }catch(error){
//     console.error("[AUTH] JWT decode failed:",error);
//     return null;
//   }
// };

// const isTokenExpired=(token:string)=>{
//   const payload=getJwtPayload(token);
//   if(!payload)return true;
//   if(typeof payload.exp!=="number")return false;
//   return payload.exp*1000<=Date.now();
// };

// export function AuthProvider({children}:AuthProviderProps){
//   const[session,setSessionState]=useState<AuthSession|null>(null);
//   const[isLoading,setIsLoading]=useState(true);
//   const mounted=useRef(true);

// useEffect(() => {
//   console.log("[AUTH STATE]", {
//     isLoading,
//     isAuthenticated: Boolean(session?.token),
//     userId: session?.data?.user_id ?? null,
//     hasToken: Boolean(session?.token),
//   });
// }, [session, isLoading]);


//   useEffect(()=>{
//     mounted.current=true;
//     return()=>{mounted.current=false};
//   },[]);

//   const loadSession=useCallback(async()=>{
//     console.log("[AUTH] Loading stored session...");
//     try{
//       const stored=await getStorageItem(SESSION_KEY);
//       if(!stored){
//         if(mounted.current)setSessionState(null);
//         return;
//       }

//       let parsed:AuthSession;
//       try{
//         parsed=JSON.parse(stored);
//       }catch(error){
//         console.error("[AUTH] Invalid stored session JSON:",error);
//         await removeStorageItem(SESSION_KEY);
//         if(mounted.current)setSessionState(null);
//         return;
//       }

//       if(!parsed?.token||!parsed?.data?.user_id){
//         console.error("[AUTH] Stored session is missing token or user_id");
//         await removeStorageItem(SESSION_KEY);
//         if(mounted.current)setSessionState(null);
//         return;
//       }

//       if(isTokenExpired(parsed.token)){
//         console.log("[AUTH] Stored token expired");
//         await removeStorageItem(SESSION_KEY);
//         if(mounted.current)setSessionState(null);
//         return;
//       }

//       console.log("[AUTH] Restoring user:",parsed.data.user_id);

//       if(mounted.current){
//         setSessionState(parsed);
//       }
//     }catch(error){
//       console.error("[AUTH] loadSession failed:",error);
//       if(mounted.current)setSessionState(null);
//     }finally{
//       if(mounted.current)setIsLoading(false);
//     }
//   },[]);

//   useEffect(()=>{
//     loadSession();
//   },[loadSession]);

//   const setSession=useCallback(async(newSession:AuthSession)=>{
//     if(!newSession?.token)throw new Error("Cannot save session without token");
//     if(!newSession?.data?.user_id)throw new Error("Cannot save session without user_id");

//     if(isTokenExpired(newSession.token)){
//       console.error("[AUTH] Cannot save expired token");
//       await removeStorageItem(SESSION_KEY);
//       if(mounted.current)setSessionState(null);
//       return;
//     }

//     console.log("[AUTH] Saving authenticated user:",newSession.data.user_id);

//     await setStorageItem(SESSION_KEY,JSON.stringify(newSession));

//     if(mounted.current){
//       setSessionState(newSession);
//     }
//   },[]);

//   const clearSession=useCallback(async()=>{
//     console.log("[AUTH] Clearing session...");
//     await removeStorageItem(SESSION_KEY);
//     if(mounted.current)setSessionState(null);
//   },[]);

//   // useEffect(()=>{
//   //   if(!session?.token)return;

//   //   const payload=getJwtPayload(session.token);
//   //   if(!payload){
//   //     clearSession();
//   //     return;
//   //   }

//   //   if(typeof payload.exp!=="number")return;

//   //   const remaining=payload.exp*1000-Date.now();

//   //   if(remaining<=0){
//   //     clearSession();
//   //     return;
//   //   }

//   //   const timer=setTimeout(()=>{
//   //     console.log("[AUTH] Token expired");
//   //     clearSession();
//   //   },remaining);

//   //   return()=>clearTimeout(timer);
//   // },[session?.token,clearSession]);

//   useEffect(() => {
//   if (!session?.token) return;

//   const payload = getJwtPayload(session.token);

//   if (!payload || typeof payload.exp !== "number") {
//     clearSession();
//     return;
//   }

//   const expiresAt = payload.exp * 1000;

//   const logoutIfExpired = () => {
//     if (Date.now() >= expiresAt) {
//       console.log("[AUTH] Token expired - logging out");
//       clearSession();
//     }
//   };

//   // Check immediately
//   logoutIfExpired();

//   // Schedule logout at expiration
//   const remaining = expiresAt - Date.now();

//   if (remaining > 0) {
//     const timer = setTimeout(logoutIfExpired, remaining);

//     return () => clearTimeout(timer);
//   }
// }, [session?.token, clearSession]);


//   const value=useMemo<AuthContextValue>(()=>({
//     session,
//     user:session?.data??null,
//     token:session?.token??null,
//     isAuthenticated:Boolean(session?.token),
//     isLoading,
//     setSession,
//     clearSession
//   }),[session,isLoading,setSession,clearSession]);

//   return(
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth(){
//   const context=useContext(AuthContext);
//   if(!context)throw new Error("useAuth must be used within an AuthProvider");
//   return context;
// }


import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
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
  clearSession: () => Promise<void>;
}

interface AuthProviderProps { children: ReactNode }

const SESSION_KEY = "data_sessions";
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const getJwtPayload = (token: string): Record<string, unknown> | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - base64.length % 4) % 4), "=");
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
  return [hours, minutes, seconds].map(v => String(v).padStart(2, "0")).join(":");
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSessionState] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeUntilExpiry, setTimeUntilExpiry] = useState<number | null>(null);
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

  const clearSession = useCallback(async () => {
    console.log("[AUTH] Clearing session...");
    updateSession(null);
    setTimeUntilExpiry(null);
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

      console.log("[AUTH] Restoring user:", parsed.data.user_id);
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
    if (!newSession?.token || !newSession?.data?.user_id) {
      throw new Error("Cannot save session without token and user_id");
    }
    if (isTokenExpired(newSession.token)) {
      console.error("[AUTH] Cannot save expired or invalid token");
      await clearSession();
      return;
    }
    await setStorageItem(SESSION_KEY, JSON.stringify(newSession));
    console.log("[AUTH] Saving authenticated user:", newSession.data.user_id);
    updateSession(newSession);
  }, [clearSession, updateSession]);

  // Live countdown and automatic logout at token expiration.
  useEffect(() => {
    const currentToken = session?.token;
    if (!currentToken) { setTimeUntilExpiry(null); return; }

    const expiresAt = getTokenExpiration(currentToken);
    if (expiresAt === null) { void clearSession(); return; }

    const updateCountdown = () => {
      if (sessionRef.current?.token !== currentToken) return;
      const remaining = Math.max(0, expiresAt - Date.now());
      setTimeUntilExpiry(remaining);
      if (remaining === 0) {
        console.log("[AUTH] Token expired - logging out");
        void clearSession();
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [session?.token, clearSession]);

  // Recheck token when the app returns to the foreground.
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
    session,
    user: session?.data ?? null,
    token: session?.token ?? null,
    isAuthenticated: Boolean(session?.token),
    isLoading,
    timeUntilExpiry,
    formattedTimeUntilExpiry,
    setSession,
    clearSession,
  }), [session, isLoading, timeUntilExpiry, formattedTimeUntilExpiry, setSession, clearSession]);

  console.log("EXPIRE TOKEN:" + formattedTimeUntilExpiry, formatRemainingTime);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}