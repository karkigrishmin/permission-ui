import { AiOutlineClose } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi";
import "./permission.css";
import { useState } from "react";

export const Permission = () => {
	const [isAccordionItemVisible, setAccordionItemVisibility] = useState(false);

	const handleAccordionHideShow = () => {
		console.log("handleAccordionHideShow");
		setAccordionItemVisibility(!isAccordionItemVisible);
	};

	console.log("isAccordionItemVisible", isAccordionItemVisible);

	return (
		<div className='permission-wrapper'>
			<div className='permission-header'>
				<div className='permission-header__left-item'>
					<p>Edit Permission</p>
					<p>(Shreel Adhikari)</p>
				</div>

				<div className='permission-header__right-item'>
					<div className='permission-actions'>
						<button>Save</button>
						<div className='close-icon'>
							<AiOutlineClose />
						</div>
					</div>
				</div>
			</div>

			<main className='modules'>
				<div className='modules__wrapper'>
					<section className='accordion'>
						<div
							className={`accordion__title ${
								isAccordionItemVisible ? "selected" : ""
							}`}
						>
							<div onClick={handleAccordionHideShow}>
								<p>Setting</p>
								<div className='chevron-icon'>
									<FiChevronRight />
								</div>
							</div>
						</div>

						<table className={`${!isAccordionItemVisible ? "hide" : ""}`}>
							<thead>
								<tr>
									<th>
										<div>
											<input
												type='checkbox'
												name='settingPermission'
												id='settingPermission'
												className='myCheckboxClass'
											/>
											<label
												onClick={() =>
													console.log("checkbox setting permissionS")
												}
											></label>
										</div>
									</th>
									<th>Setting Permission</th>
									<th>View</th>
									<th>Edit</th>
								</tr>
							</thead>

							<tbody>
								<tr>
									<td>
										<div>
											<input
												type='checkbox'
												name='organization'
												id='organization'
												className='myCheckboxClass'
											/>
											<label></label>
										</div>
									</td>
									<td>Organization</td>
									<td>
										<div>
											<input
												type='checkbox'
												name='view'
												id='view'
												className='myCheckboxClass'
											/>
											<label></label>
										</div>
									</td>
									<td>
										<div>
											<input
												type='checkbox'
												name='edit'
												id='edit'
												className='myCheckboxClass'
												checked
											/>
											<label></label>
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<div>
											<input
												type='checkbox'
												name='posSetting'
												id='posSetting'
												className='myCheckboxClass'
											/>
											<label></label>
										</div>
									</td>
									<td>POS Setting</td>
									<td>
										<div>
											<input
												type='checkbox'
												name='view'
												id='view'
												className='myCheckboxClass'
												checked
											/>
											<label></label>
										</div>
									</td>
									<td>
										<div>
											<input
												type='checkbox'
												name='edit'
												id='edit'
												className='myCheckboxClass'
											/>
											<label></label>
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<div>
											<input
												type='checkbox'
												name='userAndPermissions'
												id='userAndPermissions'
												className='myCheckboxClass'
											/>
											<label></label>
										</div>
									</td>
									<td>User and Permissions</td>
									<td>
										<div>
											<input
												type='checkbox'
												name='view'
												id='view'
												className='myCheckboxClass'
											/>
											<label></label>
										</div>
									</td>
									<td>
										<div>
											<input
												type='checkbox'
												name='edit'
												id='edit'
												className='myCheckboxClass'
											/>
											<label></label>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</section>
				</div>
			</main>
		</div>
	);
};
