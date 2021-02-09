import { IMenuOutput } from "@/core/domain/menu-domain/entity/IMenu";
import { Guid } from "guid-typescript";

export const routes:IMenuOutput[] = [
  {
    id: Guid.EMPTY,
    name: "測試",
    path: "/test-page",
    component: "pages/test-page/test-page",
    tabs: [],
    buttonClick: "",
    buttons: [],
    parentId: "000",
    icon: "",
    parentNumber: "",
    microName: "",
    componentName: "test-page",
    sort: 0,
    isShow: true,
    type: 0,
    children: [],
  }
]