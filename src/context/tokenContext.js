const { createContext, useContext, useState } = require("react");

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
	};

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
