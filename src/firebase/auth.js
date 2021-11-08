import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	getRedirectResult,
	signInWithEmailAndPassword,
	signInWithRedirect,
	updateProfile,
} from "@firebase/auth";
import { app, db, auth } from "./config";

const signInWithGoogle = async () => {
	const provider = new GoogleAuthProvider();
	signInWithRedirect(auth, provider);
};

const registerEmailPasswordUser = async (name, email, password) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;
		updateProfile(user, {
			displayName: name,
		});
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};

const signInEmailPasswordUser = async (email, password) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};

const sendPasswordResetEmail = async (email) => {
	try {
		await auth.sendPasswordResetEmail(email);
		alert("Password reset link sent!");
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};

const logout = () => auth.signOut();

export {
	signInWithGoogle,
	registerEmailPasswordUser,
	signInEmailPasswordUser,
	logout,
	auth,
	// processGoogleResults,
	sendPasswordResetEmail,
};
