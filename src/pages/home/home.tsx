import { Permission } from "../../feature";
import { NavBar } from "../../shared";
import "./home.css";

export const Home = () => {
	return (
		<div className='home'>
			<NavBar />
			<main>
				<Permission />
			</main>
		</div>
	);
};
