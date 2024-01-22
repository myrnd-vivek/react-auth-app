const { createContext, useContext, useState, useEffect } = require("react");

const TokenContext = createContext({
	token: "",
	addToken: ({ token }) => {},
	removeToken: () => {},
});

const TokenProvider = ({ children }) => {
	const [token, setToken] = useState(null);

	const addToken = ({ token }) => {
		setToken(token);
	};

	const removeToken = () => {
		setToken(null);
    localStorage.removeItem("token")
	};

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token)
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
