import { useState, useRef } from "react";
import { useTokenContext } from "../../context/tokenContext";
import { useHistory } from "react-router-dom"

import classes from "./AuthForm.module.css";

const AuthForm = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const emailInputRef = useRef(null);
	const passwordInputRef = useRef(null);

	const { addToken } = useTokenContext();
	const history = useHistory()
	

	const apiKey = process.env.REACT_APP_API_KEY;

	const submitHandler = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		const email = emailInputRef.current.value;
		const password = passwordInputRef.current.value;

		const payload = {
			email,
			password,
		};

		try {
			let url = "";
			if (isLogin) {
				url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
			} else {
				url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
			}
			const resp = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});
			const result = await resp.json();
			if (result.error) {
				setIsLoading(false);
				alert(result.error.message);
				return;
			}

			const { idToken } = result;
			addToken({ token: idToken });
			setIsLoading(false);
			history.push("/profile")
			
		} catch (error) {
			setIsLoading(false);
			alert(error.message);
		}
	};

	const switchAuthModeHandler = () => {
		setIsLogin((prevState) => !prevState);
	};

	return (
		<section className={classes.auth}>
			<h1>{isLogin ? "Login" : "Sign Up"}</h1>
			<form>
				<div className={classes.control}>
					<label htmlFor="email">Your Email</label>
					<input
						type="email"
						id="email"
						required
						ref={emailInputRef}
					/>
				</div>
				<div className={classes.control}>
					<label htmlFor="password">Your Password</label>
					<input
						type="password"
						id="password"
						required
						ref={passwordInputRef}
					/>
				</div>
				{isLoading ? (
					<p>Sending request...</p>
				) : (
					<button onClick={submitHandler}>
						{isLogin ? "Login" : "Create Account"}
					</button>
				)}
				<div className={classes.actions}>
					<button
						type="button"
						className={classes.toggle}
						onClick={switchAuthModeHandler}
					>
						{isLogin
							? "Create new account"
							: "Login with existing account"}
					</button>
				</div>
			</form>
		</section>
	);
};

export default AuthForm;
