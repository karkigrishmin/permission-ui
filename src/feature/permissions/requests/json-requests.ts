import { IPermssionInfo } from "..";

export const getPermissionData = async (): Promise<IPermssionInfo> => {
	try {
		const response = await fetch("src/shared/data/permission-data.json");
		const data: IPermssionInfo = await response.json();
		return data;
	} catch (error) {
		console.log("get permission data", error);
		throw error;
	}
};
