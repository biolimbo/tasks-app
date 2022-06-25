import { useContext, useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import SVG from "react-inlinesvg";

import { TaskContext, Task, TaskContextInterface } from "../contexts/Tasks";

function TaskForm() {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { addTask, updateTask, tasks, statusTransitions } = useContext(
		TaskContext
	) as TaskContextInterface;

	const initialTask: Task = {
		id: "",
		title: "",
		description: "",
		status: "ToDo",
		statusHistory: [],
	};

	const [unUpdatedTask, setUnUpdatedTask] = useState<Task>(initialTask);

	const [task, setTask] = useState<Task>(initialTask);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
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
			setUnUpdatedTask(task);
		}
	};

	useEffect(() => {
		if (pathname !== "/") {
			const taskId = pathname.split("/")[2];
			const task = tasks.find((task) => task.id === taskId);
			if (task) {
				setUnUpdatedTask(task);
				setTask(task);
			} else {
				navigate("/");
			}
		}
	}, [pathname, tasks]);

	return (
		<form className="h-full" onSubmit={handleSubmit}>
			<h2>{pathname !== "/" ? "Edit Task" : "Add a new Task"}</h2>
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
				rows={4}
				className="h-full md:h-fit"
			/>
			{pathname !== "/" && (
				<select name="status" value={task.status} onChange={handleChange}>
					{statusTransitions[unUpdatedTask.status].map((status) => (
						<option key={status} value={status}>
							{status}
						</option>
					))}
				</select>
			)}
			{pathname !== "/" && (
				<div>
					<p className="font-medium text-primary-700"> History</p>
					<p className="text-primary-700">{task.statusHistory.join(" -> ")}</p>
				</div>
			)}
			<div className="flex items-center justify-between gap-x-3 md:gap-x-6">
				<button className=" btn-primary-xl" type="submit">
					<SVG
						src={
							pathname !== "/"
								? "/images/icons/edit.svg"
								: "/images/icons/add.svg"
						}
						className="w-3 h-3 mr-2"
					/>
					{pathname !== "/" ? "Edit" : "Add"}
				</button>
				{pathname !== "/" && (
					<Link className="btn-secondary-xl" to="/">
						Cancel
					</Link>
				)}
			</div>
		</form>
	);
}

export default TaskForm;
