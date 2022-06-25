import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { TaskContext, Task, TaskContextInterface } from "../contexts/Tasks";

function TaskForm() {
	const { pathname } = useLocation();
	const { addTask, updateTask, tasks } = useContext(
		TaskContext
	) as TaskContextInterface;

	const initialTask: Task = {
		id: "",
		title: "",
		description: "",
		status: "ToDo",
		statusHistory: [],
	};

	const [task, setTask] = useState<Task>(initialTask);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setTask({ ...task, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (pathname === "/") {
			addTask(task);
			setTask(initialTask);
		} else {
			updateTask(task);
		}
	};

	useEffect(() => {
		if (pathname !== "/") {
			const taskId = pathname.split("/")[2];
			const task = tasks.find((task) => task.id === taskId);
			if (task) setTask(task);
		}
	}, [pathname, tasks]);

	return (
		<form onSubmit={handleSubmit}>
			<h1>{pathname !== "/" ? "Edit Task" : "Add a new Task"}</h1>
			<input
				type="text"
				name="title"
				placeholder="Title"
				value={task.title}
				onChange={handleChange}
			/>
			<textarea
				name="description"
				placeholder="Description"
				value={task.description}
				onChange={handleChange}
			/>
		</form>
	);
}

export default TaskForm;
