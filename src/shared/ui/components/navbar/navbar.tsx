import "./navbar.css";
import { AiFillSetting } from "react-icons/ai";
import { GrNotification } from "react-icons/gr";
import { BiHelpCircle } from "react-icons/bi";

export const NavBar = () => {
	return (
		<header>
			<nav>
				<a className='logo' href='/'>
					<span>tigg</span>
					<span>POS</span>
				</a>

				<div className='navbar-right-icons'>
					<div>
						<AiFillSetting />
					</div>

					<div>
						<GrNotification className='notification-icon' />
					</div>

					<div>
						<BiHelpCircle />
					</div>

					<div className='user-avatar'>
						<img src='src/assets/images/messi.png' alt='avatar' />
					</div>
				</div>
			</nav>
		</header>
	);
};
