export interface IPermssionInfo {
	name: string;
	modules: IModule[];
}

export interface IModule {
	m_name: string;
	m_id: number;
	columns: IModuleColumnData[];
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
