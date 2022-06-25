import { Link, useLocation } from "react-router-dom";

import SVG from "react-inlinesvg";

function Navbar() {
	const { pathname } = useLocation();

	return (
		<nav className="bg-primary-600 text-white min-h-[60px] flex items-center px-3 md:px-6">
			<div className="text-xl font-medium">
				{pathname !== "/" && (
					<Link to="/">
						<SVG src="/images/icons/home.svg" />
					</Link>
				)}
				<span>{`Task Management > ${pathname !== "/" ? "Edit" : "Home"}`}</span>
			</div>
		</nav>
	);
}

export default Navbar;
