import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { useTokenContext } from "../../context/tokenContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const MainNavigation = () => {
	const { token, removeToken } = useTokenContext();
	const history = useHistory();

	const logout = () => {
		removeToken();
		history.push("/auth");
	};
	return (
		<header className={classes.header}>
			<Link to="/">
				<div className={classes.logo}>React Auth</div>
			</Link>
			<nav>
				<ul>
					{!token && (
						<li>
							<Link to="/auth">Login</Link>
						</li>
					)}
					{token && (
						<>
							<li>
								<Link to="/profile">Profile</Link>
							</li>
							<li>
								<button onClick={logout}>Logout</button>
							</li>
						</>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;
