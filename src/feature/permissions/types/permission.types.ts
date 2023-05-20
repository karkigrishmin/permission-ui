export interface IPermssionInfo {
	user: IUser;
	modules: IModule[];
}

export interface IUser {
	name: string;
}

export interface IModule {
	m_name: string;
	m_id: number;
	columns: IModuleColumnData[];
	m_status: boolean;
}

export interface IModuleColumnData {
	c_name: string;
	c_id: number;
	c_status: true;
	c_permissions: IPermission[];
}

export interface IPermission {
	p_name: string;
	p_status: boolean;
}
