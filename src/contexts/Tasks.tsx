import React, { useState, useEffect, createContext } from "react";
import { v4 as uuidv4 } from "uuid";

type ProviderProps = {
	children: JSX.Element;
};

type Status = "ToDo" | "InProgress" | "Blocked" | "inQA" | "Done" | "Deployed";

type StatusTransitions = {
	ToDo: Status[];
	InProgress: Status[];
	Blocked: Status[];
	inQA: Status[];
	Done: Status[];
	Deployed: Status[];
};

type Task = {
	id: string;
	title: string;
	description: string;
	status: Status;
	statusHistory: Array<Status>;
};

type addTaskProps = { title: string; description: string };
type updateTaskProps = {
	id: string;
	title: string;
	description: string;
	status: Status;
};

interface TaskContextInterface {
	tasks: Array<Task>;
	statusTransitions: StatusTransitions;
	addTask?: (task: Task) => void;
	updateTask?: (updatedTask: Task, taskId: number) => void;
}

const statusTransitions: StatusTransitions = {
	ToDo: ["InProgress"],
	InProgress: ["Blocked", "inQA"],
	Blocked: ["ToDo"],
	inQA: ["Done"],
	Done: ["Deployed"],
	Deployed: [],
};

export const TaskContext = createContext<TaskContextInterface | null>(null);

export const TasksProvider = ({ children }: ProviderProps) => {
	const [tasks, setTasks] = useState<Task[]>([]);

	function addTask({ title, description }: addTaskProps) {
		const task: Task = {
			id: uuidv4(),
			title,
			description,
			status: "ToDo",
			statusHistory: ["ToDo"],
		};

		setTasks([...tasks, task]);
	}

	function updateTask({ id, title, description, status }: updateTaskProps) {
		const unUpdatedTask: Task | undefined = tasks.find(
			(task) => task.id === id
		);

		let response: { message: string; status: boolean } = {
			message: "",
			status: false,
		};

		const validTransition: boolean = unUpdatedTask
			? statusTransitions[unUpdatedTask.status].includes(status)
			: false;

		if (!unUpdatedTask) {
			response.message = "Task not found";
		} else if (validTransition) {
			const task: Task = {
				id,
				title,
				description,
				status: "ToDo",
				statusHistory: ["ToDo"],
			};

			setTasks([...tasks, task]);
			response = { message: "Task updated successfully", status: true };
		} else {
			response.message = "Invalid status transition";
		}

		return response;
	}

	useEffect(() => {
		console.log("useEffect", tasks);
	}, [tasks]);

	return (
		<TaskContext.Provider
			value={{ tasks, statusTransitions, addTask, updateTask }}
		>
			{children}
		</TaskContext.Provider>
	);
};
