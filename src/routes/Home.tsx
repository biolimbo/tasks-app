import { useContext } from "react";
import { Link } from "react-router-dom";
import SVG from "react-inlinesvg";

import { TaskContext, Task, TaskContextInterface } from "../contexts/Tasks";

import TaskForm from "../components/TaskForm";

function Home() {
	const { tasks } = useContext(TaskContext) as TaskContextInterface;

	return (
		<div className="h-screen max-w-5xl flex flex-col pt-16 lg:pt-20 mx-auto lg:flex-row">
			<div className=" px-6 md:px-10 mb-6 flex justify-center lg:mt-6 lg:w-[45%] lg:max-w-md">
				<TaskForm />
			</div>
			<div className="h-full lg:h-fit lg:w-full bg-primary-700 rounded-t-xl lg:rounded-xl flex flex-col overflow-hidden mt-4 lg:mb-10">
				<div className=" px-6 md:px-10 py-4 text-white">
					<h2>Tasks</h2>
				</div>
				<div className=" h-full w-full bg-primary-200 rounded-t-xl px-1 flex overflow-hidden">
					{tasks.length ? (
						<div className="h-full w-full grid grid-cols-2 lg:grid-cols-3 gap-3 overflow-scroll p-5 md:p-8">
							{tasks.map((task: Task) => (
								<div
									className="w-full h-40 lg:h-48 bg-white rounded-xl shadow-md p-3 flex flex-col"
									key={task.id}
								>
									<h3 className="mb-2.5">{task.title}</h3>
									<p>{task.description}</p>

									<div className="flex justify-between items-center mt-auto">
										<div className="btn-primary-sm">{task.status}</div>
										<Link to={`/task/${task.id}`}>
											<SVG
												src="/images/icons/edit.svg"
												className="w-6 h-6 mb-1 mr-1"
											/>
										</Link>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="w-full m-auto text-center">
							<p>You have nothing to do.</p>
							<p>Go get some sleep.</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Home;
