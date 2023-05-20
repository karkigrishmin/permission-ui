/* eslint-disable no-mixed-spaces-and-tabs */
import { AiOutlineClose } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi";
import "./permission.css";
import { useEffect, useState } from "react";
import {
	IModule,
	IModuleColumnData,
	IPermssionInfo,
	IUser,
	getPermissionData,
} from "..";

export const Permission = () => {
	const [activeAccordions, setActiveAccordions] = useState<number[]>([]);
	const [permissionData, setPermissionData] = useState<IPermssionInfo | null>(
		null
	);
	const [initialPermissionData, setInitialPermissionData] =
		useState<IPermssionInfo | null>(null);
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

	const areAllColumnStatusTrue = (
		updatedModuleData: IModule[],
		moduleId: number
	) => {
		return updatedModuleData
			.find((eachUpdatedModuleData) => eachUpdatedModuleData.m_id === moduleId)
			?.columns.every((eachColumn) => eachColumn.c_status === true);
	};

	const updateColumnStatus = (
		moduleId: number,
		columnId: number,
		newColumnStatus: boolean
	) => {
		const updatedModuleData: IModule[] =
			permissionData?.modules?.map((eachModule) => {
				return eachModule.m_id === moduleId
					? {
							...eachModule,
							m_status: eachModule.m_status
								? newColumnStatus
								: eachModule.m_status,
							columns: eachModule.columns.map((eachColumn) => {
								return eachColumn.c_id === columnId
									? {
											...eachColumn,
											c_status: newColumnStatus,
									  }
									: eachColumn;
							}) as IModuleColumnData[],
					  }
					: eachModule;
			}) ?? [];

		const allColumnStatusTrue = areAllColumnStatusTrue(
			updatedModuleData,
			moduleId
		);

		console.log("updatedModuleData", updatedModuleData);
		setPermissionData({
			modules: updatedModuleData,
			user: permissionData?.user as IUser,
		});

		if (allColumnStatusTrue) {
			console.log("areAllColumnStatusTrue", allColumnStatusTrue);
			updateAllColumnStatus(moduleId, allColumnStatusTrue);
		}
	};

	const updateAllColumnStatus = (
		moduleId: number,
		newModuleStatus: boolean
	) => {
		console.log("updateAllColumnStatus");
		const updatedModuleData: IModule[] =
			permissionData?.modules?.map((eachModule) => {
				return eachModule.m_id === moduleId
					? {
							...eachModule,
							m_status: newModuleStatus,
							columns: eachModule.columns.map((eachColumn) => {
								return {
									...eachColumn,
									c_status: newModuleStatus,
								};
							}) as IModuleColumnData[],
					  }
					: eachModule;
			}) ?? [];

		console.log("updatedModuleData", updatedModuleData);
		setPermissionData({
			modules: updatedModuleData,
			user: permissionData?.user as IUser,
		});
	};

	const updatePermissionStatus = (
		moduleId: number,
		columnId: number,
		permissionName: string,
		newPermissioinStatus: boolean
	) => {
		const updatedModuleData: IModule[] =
			permissionData?.modules?.map((eachModule) => {
				return eachModule.m_id === moduleId
					? {
							...eachModule,
							columns: eachModule.columns.map((eachColumn) => {
								return eachColumn.c_id === columnId
									? {
											...eachColumn,
											c_permissions: eachColumn.c_permissions.map(
												(eachPermission) => {
													return eachPermission.p_name === permissionName
														? {
																...eachPermission,
																p_status: newPermissioinStatus,
														  }
														: eachPermission;
												}
											),
									  }
									: eachColumn;
							}) as IModuleColumnData[],
					  }
					: eachModule;
			}) ?? [];

		console.log("updatedModuleData", updatedModuleData);
		setPermissionData({
			user: permissionData?.user as IUser,
			modules: updatedModuleData,
		});
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getPermissionData();
				setPermissionData(data);
				setInitialPermissionData(data);
			} catch (error) {
				console.log("fetchData error", error);
			}
		};

		const storedPermissionDataJson = localStorage.getItem("permissionInfo");
		if (storedPermissionDataJson) {
			const permissionData = JSON.parse(storedPermissionDataJson);
			setPermissionData(permissionData);
			setInitialPermissionData(permissionData);
		} else {
			fetchData();
		}
	}, []);

	return (
		<div className='permission-wrapper'>
			<div className='permission-header'>
				<div className='permission-header__left-item'>
					<p>{editStatus ? "Edit Permission" : "Permission"}</p>
					{editStatus && <p>({permissionData?.user?.name ?? ""})</p>}
				</div>

				<div className='permission-header__right-item'>
					<div className='permission-actions'>
						<button
							onClick={() => {
								if (editStatus) {
									console.log("save");

									localStorage.setItem(
										"permissionInfo",
										JSON.stringify(permissionData)
									);
									// setInitialPermissionData(permissionData);
									// fetch("http://localhost:3000/modules", {
									// 	method: "PUT",
									// 	headers: {
									// 		"Content-Type": "application/json",
									// 	},
									// 	body: JSON.stringify({
									// 		modules: [
									// 			{ name: "newTestttttttt", id: 1 },
									// 			{ name: "testing", id: 2 },
									// 		],
									// 	}),
									// })
									// 	.then((response) => response.json())
									// 	.then((data) => {
									// 		console.log("Response:", data);
									// 	})
									// 	.catch((error) => {
									// 		console.error("Error:", error);
									// 	});
								}
								setEditStatus(!editStatus);
							}}
						>
							{editStatus ? "Save" : "Edit"}
						</button>
						{editStatus && (
							<div className='close-icon'>
								<AiOutlineClose
									onClick={() => {
										setEditStatus(false);
										setPermissionData(initialPermissionData);
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
													name={eachModule.m_name}
													id={eachModule.m_id.toString()}
													className='myCheckboxClass'
													checked={eachModule.m_status}
												/>
												<label
													onClick={() => {
														updateAllColumnStatus(
															eachModule.m_id,
															!eachModule.m_status
														);
													}}
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
															updateColumnStatus(
																eachModule.m_id,
																eachColumn.c_id,
																!eachColumn.c_status
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
														<label
															onClick={() => {
																updatePermissionStatus(
																	eachModule.m_id,
																	eachColumn.c_id,
																	eachPermission.p_name,
																	!eachPermission.p_status
																);
															}}
														></label>
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
