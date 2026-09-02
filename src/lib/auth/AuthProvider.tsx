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
                const storedSession =
                    await getStorageItem(
                        SESSION_KEY
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

                    setSessionState(
                        parsedSession
                    );
                } catch {
                    await removeStorageItem(
                        SESSION_KEY
                    );

                    setSessionState(null);
                }
            } catch {
                setSessionState(null);
            } finally {
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
            await setStorageItem(
                SESSION_KEY,
                JSON.stringify(newSession)
            );

            setSessionState(
                newSession
            );
        },
        []
    );

    const clearSession =
        useCallback(async () => {
            await removeStorageItem(
                SESSION_KEY
            );

            setSessionState(null);
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