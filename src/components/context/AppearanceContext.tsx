import React, {
    createContext,
    useContext,
    useMemo,
    useState,
} from "react";

type AppearanceContextType = {
  fontSize: number;
  fontScale: number;
  setFontSize: (size: number) => void;
};

const AppearanceContext = createContext<
  AppearanceContextType | undefined
>(undefined);

export function AppearanceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [fontSize, setFontSize] = useState(16);

  // 16 is the default/reference font size.
  //
  // 12 => 0.75
  // 16 => 1.00
  // 20 => 1.25
  // 24 => 1.50
  const fontScale = fontSize / 16;

  const value = useMemo(
    () => ({
      fontSize,
      fontScale,
      setFontSize,
    }),
    [fontSize, fontScale]
  );

  return (
    <AppearanceContext.Provider value={value}>
      {children}
    </AppearanceContext.Provider>
  );
}

export function useAppearance() {
  const context = useContext(AppearanceContext);

  if (!context) {
    throw new Error(
      "useAppearance must be used inside AppearanceProvider"
    );
  }

  return context;
}
