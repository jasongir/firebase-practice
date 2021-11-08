import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { auth, logout } from "../firebase/auth";
import { db } from "../firebase/config";
import { onAuthStateChanged } from "@firebase/auth";

function Dashboard() {
	// const [user, loading, error] = useAuthState(auth);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setName(user.displayName);
				setEmail(user.email);
			} else {
				navigate("/");
			}
		});
	});

	return (
		<div className="dashboard">
			<div className="dashboard__container">
				Logged in as
				<div>{name}</div>
				<div>{email}</div>
				<button className="dashboard__btn" onClick={logout}>
					Logout
				</button>
			</div>
		</div>
	);
}
export default Dashboard;
