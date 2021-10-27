import { Guid } from "guid-typescript";
import { IMenuRoute } from "@/shared/menu/IMenu";
import NotFoundView from "@/component/notFound";

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
