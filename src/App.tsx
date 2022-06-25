import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { TasksProvider } from "./contexts/Tasks";

import Home from "./routes/Home";
import Task from "./routes/Task";

import Navbar from "./components/Navbar";

function App() {
	return (
		<Router>
			<header className="">
				<Navbar />
			</header>
			<div className="App">
				<TasksProvider>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/task/:id" element={<Task />} />
					</Routes>
				</TasksProvider>
			</div>
		</Router>
	);
}

export default App;
