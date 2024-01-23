const { createContext, useContext, useState, useEffect } = require("react");
import { useHistory } from "react-router-dom";

const TokenContext = createContext({
	token: "",
	addToken: ({ token }) => {},
	removeToken: () => {},
});

const TokenProvider = ({ children }) => {
	const [token, setToken] = useState(null);
  const history = useHistory();

	const addToken = ({ token }) => {
		setToken(token);
    localStorage.setItem("token",token);
    localStorage.setItem("tokenStoreTime", new Date().getTime());
	};

	const removeToken = () => {
		setToken(null);
    localStorage.removeItem("token")
	};

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenStoreTime = localStorage.getItem("tokenStoreTime");
    if (token && tokenStoreTime) {
      const expirationTime = parseInt(tokenStoreTime) + (5 * 60 * 1000); 
      if(new Date().getTime() < expirationTime) {
        setToken(token)
      } else {
        removeToken();
        alert("Login Again !!");
        history.push("/auth")
      }
    }
  },[])

	return (
		<TokenContext.Provider value={{ token, addToken, removeToken }}>
			{children}
		</TokenContext.Provider>
	);
};

export const useTokenContext = () => {
	return useContext(TokenContext);
};

export default TokenProvider;
