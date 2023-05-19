import { AiOutlineClose } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi";
import "./permission.css";
import { useEffect, useState } from "react";
import { IPermssionInfo, getPermissionData } from "..";

export const Permission = () => {
	const [activeAccordions, setActiveAccordions] = useState<number[]>([]);
	const [permissionData, setPermissionData] = useState<IPermssionInfo | null>(
		null
	);
	const [editStatus, setEditStatus] = useState(false);

	const handleAccordionState = (moduleId: number) => {
		console.log("handleAccordionHideShow");
		if (activeAccordions.includes(moduleId)) {
			setActiveAccordions(
				activeAccordions.filter(
					(eachActiveAccordion) => eachActiveAccordion !== moduleId
				)
			);
		} else {
			setActiveAccordions((prevActiveAccordions) => [
				...prevActiveAccordions,
				moduleId,
			]);
		}
	};

	console.log("active accordions", activeAccordions);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getPermissionData();
				setPermissionData(data);
			} catch (error) {
				console.log("fetchData error", error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className='permission-wrapper'>
			<div className='permission-header'>
				<div className='permission-header__left-item'>
					<p>{editStatus ? "Edit Permission" : "Permission"}</p>
					{editStatus && <p>({permissionData?.name ?? ""})</p>}
				</div>

				<div className='permission-header__right-item'>
					<div className='permission-actions'>
						<button
							onClick={() => {
								setEditStatus(!editStatus);
							}}
						>
							{editStatus ? "Save" : "Edit"}
						</button>
						{editStatus && (
							<div className='close-icon'>
								<AiOutlineClose
									onClick={() => {
										setEditStatus(!editStatus);
									}}
								/>
							</div>
						)}
					</div>
				</div>
			</div>

			<main className='modules'>
				<div className='modules__wrapper'>
					{permissionData?.modules.map((eachModule) => (
						<section className='accordion'>
							<div
								className={`accordion__title ${
									activeAccordions.includes(eachModule.m_id) ? "selected" : ""
								}`}
							>
								<div onClick={() => handleAccordionState(eachModule.m_id)}>
									<p>{eachModule.m_name}</p>
									<div className='chevron-icon'>
										<FiChevronRight />
									</div>
								</div>
							</div>

							<table
								className={`${
									activeAccordions.includes(eachModule.m_id) ? "show" : "hide"
								} ${!editStatus ? "disabled-table" : ""}`}
							>
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
										<th>{`${eachModule.m_name}  Permission`.toUpperCase()}</th>
										{eachModule.columns.map(
											(eachColumn, index) =>
												index === 0 &&
												eachColumn.c_permissions.map(
													(eachPermission, index) => (
														<th>{eachPermission.p_name}</th>
													)
												)
										)}
									</tr>
								</thead>

								<tbody>
									{eachModule.columns.map((eachColumn) => (
										<tr className={!eachColumn.c_status ? "disabled-row" : ""}>
											<td>
												<div>
													<input
														type='checkbox'
														name={eachColumn.c_name}
														id={eachColumn.c_id.toString()}
														className='myCheckboxClass'
														checked={eachColumn.c_status}
													/>
													<label
														onClick={() => {
															console.log(
																"module id: ",
																eachModule.m_id,
																"column id: ",
																eachColumn.c_id
															);
														}}
													></label>
												</div>
											</td>
											<td>{eachColumn.c_name}</td>
											{eachColumn.c_permissions.map((eachPermission) => (
												<td>
													<div>
														<input
															type='checkbox'
															name={eachPermission.p_name}
															id={eachPermission.p_name}
															className='myCheckboxClass'
															checked={eachPermission.p_status}
														/>
														<label></label>
													</div>
												</td>
											))}
										</tr>
									))}
								</tbody>
							</table>
						</section>
					))}
				</div>
			</main>
		</div>
	);
};
