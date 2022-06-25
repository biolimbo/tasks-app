import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./routes/Home";
import Task from "./routes/Task";

function App() {
	return (
		<Router>
			<header className="">
				<Navbar />
			</header>
			<div className="App">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/task/:id" element={<Task />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
