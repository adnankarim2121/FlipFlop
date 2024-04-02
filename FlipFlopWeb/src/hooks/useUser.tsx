import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserInfo {
  // Add properties according to the structure of your userInfoObject
  [key: string]: any; // This allows any property with any value
  username?: string
}

const UserContext = createContext<[UserInfo | null, (userInfo: UserInfo | null) => void]>([null, () => {}]);

interface UserProviderProps {
  children: ReactNode; // Define the type for children
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  return (
    <UserContext.Provider value={[userInfo, setUserInfo]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): [UserInfo | null, (userInfo: UserInfo | null) => void] => useContext(UserContext);

