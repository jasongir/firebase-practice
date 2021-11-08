import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router";

import {
	getDatabase,
	ref,
	set,
	push,
	onValue,
	onChildAdded,
	off,
} from "@firebase/database";

import Todo from "./Todo";
import { logout } from "../firebase/auth";

const db = getDatabase();

const Todos = () => {
	const navigate = useNavigate();
	const [todos, setTodos] = useState([]);
	const [userId, setUserId] = useState(null);

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	//  if user not logged in, bring them to login page
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			// if the user is not logged in
			if (!user) {
				navigate("/");
			} else {
				setUserId(user.uid);
			}
		});
	});

	const createTodo = (userId, title, content) => {
		const todoListRef = ref(db, `todos/${userId}`);
		const newTodoRef = push(todoListRef);
		set(newTodoRef, {
			title,
			content,
		});
	};

	useEffect(() => {
		const userTodoRef = ref(db, `todos/${userId}`);
		const childAdded = onChildAdded(userTodoRef, (newTodo) => {
			console.log("all todos" + [...todos]);
			const newTodos = [
				...todos,
				{
					key: newTodo.key,
					...newTodo.val(),
				},
			];
			setTodos(newTodos);
			console.log(newTodos);
			console.log("child added is running again");
		});
		// return () => off(childAdded);
	}, []);

	// useEffect(() => {
	// 	const userTodoRef = ref(db, `todos/${userId}`);
	// 	const initialOnValue = onValue(userTodoRef, (snapshot) => {
	// 		const newTodos = [];
	// 		snapshot.forEach((childSnapshot) => {
	// 			const newTodo = {
	// 				key: childSnapshot.key,
	// 				...childSnapshot.val(),
	// 			};
	// 			newTodos.push(newTodo);
	// 		});
	// 		console.log(newTodos);
	// 		setTodos((oldTodos) => newTodos);
	// 	});
	// 	return () => off(initialOnValue);
	// });

	return (
		<div>
			<button onClick={logout}>Sign out</button>
			<h2>List of todos:</h2>
			<input
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<input
				type="text"
				value={content}
				onChange={(e) => setContent(e.target.value)}
			/>
			<button onClick={() => createTodo(userId, title, content)}>CREATE</button>

			{todos.map((todo) => (
				<Todo {...todo} />
			))}
		</div>
	);
};

export default Todos;
