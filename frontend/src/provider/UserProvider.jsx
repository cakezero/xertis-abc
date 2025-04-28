import { useState } from "react";
import { UserContext } from "./useUser";

// UserProvider component to wrap the app and provide the user state
export const UserProvider = ({ children }) => {
  const [globalUser, setGlobalUser] = useState(true) //Changed the useState parameter to "true" to allow access to the dashboard
  const [link, setLink] = useState("")

  return (
    <UserContext.Provider value={{ globalUser, setGlobalUser, link, setLink }}>
      {children}
    </UserContext.Provider>
  );
};
