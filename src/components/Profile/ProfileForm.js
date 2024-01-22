import { useRef } from "react";
import { useTokenContext } from "../../context/tokenContext";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
	const newPasswordRef = useRef(null);
	const { token } = useTokenContext();

	const passwordChangeHandler = async (e) => {
		e.preventDefault();
		try {
			const newPassword = newPasswordRef.current.value;
			const apiKey = process.env.REACT_APP_API_KEY;

			const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`;

			const resp = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					idToken: token,
					newPassword,
					returnSecureToken: false,
				}),
			});
			const result = await resp.json();
      console.log(result);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form className={classes.form}>
			<div className={classes.control}>
				<label htmlFor="new-password">New Password</label>
				<input type="password" id="new-password" ref={newPasswordRef} />
			</div>
			<div className={classes.action}>
				<button onClick={passwordChangeHandler}>Change Password</button>
			</div>
		</form>
	);
};

export default ProfileForm;
