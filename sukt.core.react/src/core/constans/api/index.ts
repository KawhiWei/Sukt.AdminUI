export const MenuApi = {
  resetfulApi: "/permissionmanagement/menus",
  createMenu: "/menu/createAsync",
  updateMenu: "/menu/updateAsync",
  deleteMenu: "/menu/DeleteAsync",
  alls: "alls",
  getloadRowById: "/menu/GetLoadFromMenuAsync",
  getTree:"permissionmanagement/menus/menutrees",
  getRouteMenuByUser: "/Menu/GetUserMenuTreeAsync"
}
export const UserApi = {
  resetfulApi:"/identity/users",
  getpage: "pagelist",
  allocationRole: "roles",  
}
export const RoleApi = {
  resetfulApi: "/identity/roles",
  getpage: "/identity/roles/pagelist",
  allocationRoleMenu:"/permissionmanagement/permission",
}

export const FunctionApi = {
  create: "/Function/createAsync",
  update: "/Function/updateAsync",
  delete: "/Function/DeleteAsync",
  getpage: "/Function/GetPageAsync",
  getloadRowById: "/Function/LoadFormAsync",
}
export const MultiTenantApi = {
  create: "/MultiTenant/createAsync",
  update: "/MultiTenant/updateAsync",
  delete: "/MultiTenant/DeleteAsync",
  getpage: "/MultiTenant/GetPageAsync",
  getloadRowById: "/MultiTenant/LoadFormAsync",
  getConntionStringloadRowById: "/MultiTenantConntionString/LoadFormAsync",
  createConntionString: "/MultiTenantConntionString/createAsync",
  updateConntionString: "/MultiTenantConntionString/updateAsync",
  deleteConntionString: "/MultiTenantConntionString/DeleteAsync",
  getpageConntionString: "/MultiTenantConntionString/GetPageAsync",
}
