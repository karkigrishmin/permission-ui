import { IModule, IModuleColumnData, IPermission } from "../..";
import "./table.css";

interface ITable {
	performAllColumnStatusUpdate: () => void;
	performColumnStatusUpdate: (eachColumn: IModuleColumnData) => void;
	performPermissionStatusUpdate: (
		eachColumn: IModuleColumnData,
		eachPermission: IPermission
	) => void;
	eachModule: IModule;
	isActive: boolean;
	isDisableTable: boolean;
}

export const Table = ({
	performAllColumnStatusUpdate,
	performColumnStatusUpdate,
	performPermissionStatusUpdate,
	eachModule,
	isActive,
	isDisableTable,
}: ITable) => {
	return (
		<>
			<table
				className={`${isActive ? "show" : "hide"} ${
					isDisableTable ? "disabled-table" : ""
				}`}
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
								<label onClick={performAllColumnStatusUpdate}></label>
							</div>
						</th>
						<th>{`${eachModule.m_name}  Permission`.toUpperCase()}</th>

						{eachModule.columns.map(
							(eachColumn, index) =>
								index === 0 &&
								eachColumn.c_permissions.map((eachPermission) => (
									<th>{eachPermission.p_name}</th>
								))
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
										onClick={() => performColumnStatusUpdate(eachColumn)}
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
											onClick={() =>
												performPermissionStatusUpdate(
													eachColumn,
													eachPermission
												)
											}
										></label>
									</div>
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};
