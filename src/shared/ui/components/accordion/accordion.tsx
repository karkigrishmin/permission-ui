import { ReactNode } from "react";
import { FiChevronRight } from "react-icons/fi";
import "./accordion.css";

interface IAccordion {
	children: ReactNode;
	isActive: boolean;
	title: string;
	handleAccordionState: () => void;
}

export const Accordion = ({
	children,
	isActive,
	title,
	handleAccordionState,
}: IAccordion) => {
	return (
		<>
			<section className='accordion'>
				<div className={`accordion__title ${isActive ? "selected" : ""}`}>
					<div onClick={() => handleAccordionState()}>
						<p>{title}</p>
						<div className='chevron-icon'>
							<FiChevronRight />
						</div>
					</div>
				</div>
				{children}
			</section>
		</>
	);
};
