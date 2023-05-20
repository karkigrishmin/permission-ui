import { describe, it } from "vitest";
import permissionData from "../../../../shared/data/permission-data.json";
import {
	performAllColumnStatusUpdate,
	performColumnStatusUpdate,
	performPermissionStatusUpdate,
	updateModuleStatus,
} from "..";

describe("performPermissionStatusUpdate", () => {
	it("should update the permission status correctly", () => {
		const moduleId = 1;
		const columnId = 13;
		const permissionName = "view";
		const newPermissionStatus = false;
		const updatedPermissionData = performPermissionStatusUpdate(
			moduleId,
			columnId,
			permissionName,
			newPermissionStatus,
			permissionData
		);

		expect(
			updatedPermissionData.modules[0].columns[1].c_permissions[0].p_status
		).toBe(false);
	});
});

describe("performColumnStatusUpdate", () => {
	it("should update the column status correctly", () => {
		const moduleId = 1;
		const columnId = 13;
		const newColumnStatus = false;
		const updatedPermissionData = performColumnStatusUpdate(
			moduleId,
			columnId,
			newColumnStatus,
			permissionData
		);

		expect(updatedPermissionData.modules[0].columns[1].c_status).toBe(false);
	});
});

describe("performAllColumnStatusUpdate", () => {
	it("should update all the column status correctly", () => {
		const moduleId = 1;
		const newModuleStatus = true;

		const updatedPermissionDataWithAllColumnStatus =
			performAllColumnStatusUpdate(moduleId, newModuleStatus, permissionData);

		const columns = updatedPermissionDataWithAllColumnStatus.modules[0].columns;
		const allColumnsTrue = columns.every(
			(eachColumn) => eachColumn.c_status === true
		);

		expect(allColumnsTrue).toBe(true);
		expect(updatedPermissionDataWithAllColumnStatus.modules[0].m_status).toBe(
			true
		);
	});
});

describe("updateModuleStatus", () => {
	it("should update module status to true when all column status is true and vice-versa", () => {
		const permissionData = {
			user: {
				name: "Grishmin",
			},
			modules: [
				{
					m_name: "Setting",
					m_id: 1,
					m_status: true,
					columns: [
						{
							c_name: "organization",
							c_id: 12,
							c_status: false,
							c_permissions: [
								{
									p_name: "view",
									p_status: true,
								},
								{
									p_name: "edit",
									p_status: true,
								},
							],
						},
						{
							c_name: "POS Setting",
							c_id: 13,
							c_status: true,
							c_permissions: [
								{
									p_name: "view",
									p_status: true,
								},
								{
									p_name: "edit",
									p_status: true,
								},
							],
						},
						{
							c_name: "User and Permissions",
							c_id: 14,
							c_status: true,
							c_permissions: [
								{
									p_name: "view",
									p_status: true,
								},
								{
									p_name: "edit",
									p_status: true,
								},
							],
						},
					],
				},
			],
		};
		const moduleId = 1;
		const updatedPermissionDataWithModuleStatus = updateModuleStatus(
			moduleId,
			permissionData
		);

		expect(updatedPermissionDataWithModuleStatus.modules[0].m_status).toBe(
			false
		);
	});
});
