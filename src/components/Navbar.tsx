import { Link, useLocation } from "react-router-dom";

import SVG from "react-inlinesvg";

function Navbar() {
	const { pathname } = useLocation();

	return (
		<nav className="">
			<div className="text-xl font-medium">
				<span>{`Task Management > ${pathname !== "/" ? "Edit" : "Home"}`}</span>
			</div>
		</nav>
	);
}

export default Navbar;
