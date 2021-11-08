import "./App.css";
import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	useParams,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Dashboard from "./components/Dashboard";
import Todos from "./components/Todos";
import Todo from "./components/Todo";

function App() {
	const params = useParams();
	return (
		<Router>
			<div className="App">
				<h1>Welcome to the todo list!</h1>
				<Routes>
					<Route path="/register" element={<Register />} />
					<Route path="/reset" element={<Reset />} />
					<Route path="/dashboard" element={<Dashboard />} />

					<Route path="/todos/:uid" element={<Todo />} />
					<Route path="/todos" element={<Todos />} />

					<Route path="/" element={<Login />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
