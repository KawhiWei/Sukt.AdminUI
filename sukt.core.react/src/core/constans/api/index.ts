export const MenuApi = {
  createMenu: "/menu/createAsync",
  updateMenu: "/menu/updateAsync",
  deleteMenu: "/menu/DeleteAsync",
  gettable: "/menu/GetMenuTableAsync",
  getloadRowById: "/menu/GetLoadFromMenuAsync",
  getTree:"/Menu/GetTreeAsync",
  getRouteMenuByUser: "/Menu/GetUserMenuTreeAsync"
}
export const UserApi = {
  create: "/User/createAsync",
  update: "/User/updateAsync",
  delete: "/User/DeleteAsync",
  getpage: "/User/GetPageAsync",
  getloadRowById: "/User/LoadFormAsync",
  allocationUserRole: "/UserRole/AllocationUserRoleAsync",
  getLoadUserRole: "/UserRole/GetLoadUserRoleAsync",
  
}
export const RoleApi = {
  create: "/Role/createAsync",
  update: "/Role/updateAsync",
  delete: "/Role/DeleteAsync",
  getpage: "/Role/GetPageAsync",
  getloadRowById: "/Role/LoadFormAsync",
  getseletedlist:"/Role/GetSelectedListAsync",
  allocationRoleMenu:"/RoleMenu/AllocationMenuAsync",
  getallocationRoleMenu:"/RoleMenu/GetAllocationRoleMenuIdAsync",
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
}
