import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { TasksProvider } from "./contexts/Tasks";

import Home from "./routes/Home";
import Task from "./routes/Task";

import Navbar from "./components/Navbar";

function App() {
	return (
		<Router>
			<div className="h-screen">
				<header className="fixed z-20 w-full">
					<Navbar />
				</header>
				<main className="h-full">
					<TasksProvider>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/task/:id" element={<Task />} />
						</Routes>
					</TasksProvider>
				</main>
			</div>
		</Router>
	);
}

export default App;
