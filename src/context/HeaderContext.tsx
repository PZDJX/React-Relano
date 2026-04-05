import React, { 
  createContext, 
  useContext, 
  useState, 
  ReactNode 
} from "react";

type HeaderContextType = {
  isOpen: boolean;
  toggleHeader: () => void;
};

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const useHeader = () => {
  const context = useContext(HeaderContext);

  if (!context) {
    throw new Error('Header must be used within a HeaderProvider');
  }

  return context;
};

interface HeaderProviderProps {
  children: ReactNode;
}

export const HeaderProvider: React.FC<HeaderProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleHeader = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <HeaderContext.Provider value={{ isOpen, toggleHeader }}>
      {children}
    </HeaderContext.Provider>
  );
};
