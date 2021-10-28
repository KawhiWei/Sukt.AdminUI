export enum EMenuType {
  /**
   * 菜单
   */
  Menu = 0,
  /**
   * tab页
   */
  Tab = 5,
  /**
   * 按钮
   */
  Button = 10
}
export enum EMenuMode {
  vertical = "vertical",
  horizontal = "horizontal"
}
/**
 * 任务类型数组
 */
export const MenuTypeEnumList: Array<any> = [
  {
    label: "菜单",
    value: EMenuType.Menu
  },
  {
    label: "按钮",
    value: EMenuType.Button
  },
  {
    label: "Tabs标签页",
    value: EMenuType.Tab
  }
]
export enum EMenuTheme {
  light = "light",
  dark = "dark",
  primary = "primary"
}



