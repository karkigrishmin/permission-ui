import { IModule, IModuleColumnData, IPermission, IPermssionInfo } from "..";

export const updatePermissionStatus = (
	eachPermission: IPermission,
	newPermissioinStatus: boolean,
	permissionName: string
): IPermission => {
	if (eachPermission.p_name === permissionName) {
		return {
			...eachPermission,
			p_status: newPermissioinStatus,
		};
	}
	return eachPermission;
};

export const updateColumnPermissions = (
	eachColumn: IModuleColumnData,
	columnId: number,
	newPermissioinStatus: boolean,
	permissionName: string
) => {
	if (eachColumn.c_id === columnId) {
		const updatedPermissons = eachColumn.c_permissions.map((eachPermission) =>
			updatePermissionStatus(
				eachPermission,
				newPermissioinStatus,
				permissionName
			)
		);

		return {
			...eachColumn,
			c_permissions: updatedPermissons,
		};
	}
	return eachColumn;
};

export const performPermissionStatusUpdate = (
	moduleId: number,
	columnId: number,
	permissionName: string,
	newPermissioinStatus: boolean,
	permissionData: IPermssionInfo
): IPermssionInfo => {
	// ---------------Second approach-----------------
	const updatedModuleData: IModule[] = permissionData.modules.map(
		(eachModule) => {
			if (eachModule.m_id === moduleId) {
				const updatedColumns = eachModule.columns.map((eachColumn) =>
					updateColumnPermissions(
						eachColumn,
						columnId,
						newPermissioinStatus,
						permissionName
					)
				);
				return {
					...eachModule,
					columns: updatedColumns,
				};
			}
			return eachModule;
		}
	);

	console.log(
		"performPermissionStatusUpdat()-updatedModuleData",
		updatedModuleData
	);

	return {
		...permissionData,
		modules: updatedModuleData,
	};
};

export const areAllColumnStatusTrue = (
	updatedModuleData: IModule[],
	moduleId: number
) => {
	return updatedModuleData
		.find((eachUpdatedModuleData) => eachUpdatedModuleData.m_id === moduleId)
		?.columns.every((eachColumn) => eachColumn.c_status === true);
};

export const updateColumnStatus = (
	eachColumn: IModuleColumnData,
	columnId: number,
	newColumnStatus: boolean
): IModuleColumnData => {
	if (eachColumn.c_id === columnId) {
		return {
			...eachColumn,
			c_status: newColumnStatus,
		};
	}
	return eachColumn;
};

export const performColumnStatusUpdate = (
	moduleId: number,
	columnId: number,
	newColumnStatus: boolean,
	permissionData: IPermssionInfo
): IPermssionInfo => {
	// second approach
	const updatedModuleData: IModule[] = permissionData.modules.map(
		(eachModule) => {
			if (eachModule.m_id === moduleId) {
				const updatedColumns: IModuleColumnData[] = eachModule.columns.map(
					(eachColumn) =>
						updateColumnStatus(eachColumn, columnId, newColumnStatus)
				);
				return {
					...eachModule,
					columns: updatedColumns,
				};
			}
			return eachModule;
		}
	);

	console.log(
		"performColumnStatusUpdate()-updatedModuleData",
		updatedModuleData
	);

	// const allColumnStatusTrue = areAllColumnStatusTrue(
	// 	updatedModuleData,
	// 	moduleId
	// );

	// if (allColumnStatusTrue) {
	// 	console.log("areAllColumnStatusTrue", allColumnStatusTrue);
	// 	updateAllColumnStatus(moduleId, allColumnStatusTrue);
	// }

	return {
		...permissionData,
		modules: updatedModuleData,
	};
};

const updateAllColumnStatus = (
	eachColumn: IModuleColumnData,
	newModuleStatus: boolean
) => ({
	...eachColumn,
	c_status: newModuleStatus,
});

export const performAllColumnStatusUpdate = (
	moduleId: number,
	newModuleStatus: boolean,
	permissionData: IPermssionInfo
): IPermssionInfo => {
	const updatedModuleData: IModule[] = permissionData.modules.map(
		(eachModule) => {
			if (eachModule.m_id === moduleId) {
				const updatedColumns: IModuleColumnData[] = eachModule.columns.map(
					(eachColumn) => updateAllColumnStatus(eachColumn, newModuleStatus)
				);

				return {
					...eachModule,
					m_status: newModuleStatus,
					columns: updatedColumns,
				};
			}
			return eachModule;
		}
	);

	console.log(
		"performAllColumnStatusUpdate()-updatedModuleData",
		updatedModuleData
	);

	return {
		...permissionData,
		modules: updatedModuleData,
	};
};
