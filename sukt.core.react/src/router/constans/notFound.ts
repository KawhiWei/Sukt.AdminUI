import NotFoundView from "@/component/notFound";
import { IMenuRoute } from "@/core/domain/menu-domain/entity/IMenu";
import { Guid } from "guid-typescript";

const notFound: IMenuRoute[] = [
  {
    path: '/404',
    component: NotFoundView,
    children: [],
    isShow: false,
    name: "404",
    id: Guid.create().toString()
  }
];

export default notFound;
