import React, { useState, createContext } from "react";
import { v4 as uuidv4 } from "uuid";

type ProviderProps = {
	children: JSX.Element;
};

export type Status =
	| "ToDo"
	| "InProgress"
	| "Blocked"
	| "InQA"
	| "Done"
	| "Deployed";

type StatusTransitions = {
	ToDo: Status[];
	InProgress: Status[];
	Blocked: Status[];
	InQA: Status[];
	Done: Status[];
	Deployed: Status[];
};

export type Task = {
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

export interface TaskContextInterface {
	tasks: Array<Task>;
	statusTransitions: StatusTransitions;
	addTask: (task: Task) => void;
	updateTask: (updatedTask: Task) => void;
}

const statusTransitions: StatusTransitions = {
	ToDo: ["ToDo", "InProgress"],
	InProgress: ["InProgress", "Blocked", "InQA"],
	Blocked: ["Blocked", "ToDo"],
	InQA: ["InQA", "Done"],
	Done: ["Done", "Deployed"],
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
		const unUpdatedTaskIndex: number | undefined = tasks.findIndex(
			(task) => task.id === id
		);

		let response: { message: string; status: boolean } = {
			message: "",
			status: false,
		};

		const taskExists: boolean = unUpdatedTaskIndex !== -1;

		const validTransition: boolean =
			unUpdatedTaskIndex !== -1
				? statusTransitions[tasks[unUpdatedTaskIndex].status].includes(status)
				: false;

		if (!taskExists) {
			response.message = "Task not found";
		} else if (validTransition) {
			const updatedStatusHistory =
				status !== tasks[unUpdatedTaskIndex].status
					? [...tasks[unUpdatedTaskIndex].statusHistory, status]
					: tasks[unUpdatedTaskIndex].statusHistory;
			const task: Task = {
				id,
				title,
				description,
				status: status,
				statusHistory: updatedStatusHistory,
			};

			let updatedTasks: Task[] = [...tasks];

			updatedTasks.splice(unUpdatedTaskIndex, 1, task);

			setTasks(updatedTasks);
			response = { message: "Task updated successfully", status: true };
		} else {
			response.message = "Invalid status transition";
		}

		return response;
	}

	return (
		<TaskContext.Provider
			value={{ tasks, statusTransitions, addTask, updateTask }}
		>
			{children}
		</TaskContext.Provider>
	);
};
