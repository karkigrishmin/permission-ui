import { AiOutlineClose } from "react-icons/ai";
import "./permission.css";
import { useEffect, useState } from "react";
import { IPermssionInfo, getPermissionData } from "..";
import {
	performAllColumnStatusUpdate,
	performColumnStatusUpdate,
	performPermissionStatusUpdate,
	updateModuleStatus,
} from "../helper";
import { Table } from "./components";
import { Accordion } from "../../../shared";

export const Permission = () => {
	const [activeAccordions, setActiveAccordions] = useState<number[]>([]);
	const [permissionData, setPermissionData] = useState<IPermssionInfo | null>(
		null
	);
	const [initialPermissionData, setInitialPermissionData] =
		useState<IPermssionInfo | null>(null);
	const [editStatus, setEditStatus] = useState(false);

	const handleAccordionState = (moduleId: number) => {
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
									localStorage.setItem(
										"permissionInfo",
										JSON.stringify(permissionData)
									);
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
						<Accordion
							isActive={activeAccordions.includes(eachModule.m_id)}
							title={eachModule.m_name}
							handleAccordionState={() => handleAccordionState(eachModule.m_id)}
						>
							<Table
								performAllColumnStatusUpdate={() =>
									setPermissionData(
										performAllColumnStatusUpdate(
											eachModule.m_id,
											!eachModule.m_status,
											permissionData
										)
									)
								}
								performColumnStatusUpdate={async ({ c_id, c_status }) => {
									const updatedColumnStatusData = performColumnStatusUpdate(
										eachModule.m_id,
										c_id,
										!c_status,
										permissionData
									);
									setPermissionData(updatedColumnStatusData);
									setPermissionData(
										updateModuleStatus(eachModule.m_id, updatedColumnStatusData)
									);
								}}
								performPermissionStatusUpdate={(eachColumn, eachPermission) => {
									setPermissionData(
										performPermissionStatusUpdate(
											eachModule.m_id,
											eachColumn.c_id,
											eachPermission.p_name,
											!eachPermission.p_status,
											permissionData
										)
									);
								}}
								eachModule={eachModule}
								isActive={activeAccordions.includes(eachModule.m_id)}
								isDisableTable={!editStatus}
							/>
						</Accordion>
					))}
				</div>
			</main>
		</div>
	);
};
