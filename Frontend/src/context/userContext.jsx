import { createContext, useState } from "react";

export const UserContext = createContext(null);

const UserContextProvider = (props) => {
  const [user, setUser] = useState();
  const contextValue = { user, setUser };
  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
