import { createContext, useState } from "react";

export interface IAuth {
  auth: any;
  setAuth: any;
}
const AuthContext = createContext<IAuth>({ auth: {}, setAuth: () => {} });
export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState({});
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
