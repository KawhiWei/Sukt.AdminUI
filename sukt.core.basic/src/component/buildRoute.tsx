import { asyncComponent as async } from "./asyncComponent";
import { IMenuOutput, IMenuRoute } from '@/core/domain/menu-domain/entity/IMenu';
import { renderRoutes } from "react-router-config";
import { useEffect, useState } from "react";
const BuildRoute = (props: {routes:IMenuOutput[]}) => {
  const {routes} = props;
  const handleRouters = (menu: IMenuOutput[]) => {
    let childRouter: IMenuRoute[] = [];
    menu.forEach((item) => {
      if (!!item.children && item.children.length) {
        childRouter = [...childRouter, ...handleRouters(item.children)];
      } else {
        const itemMenu: IMenuRoute = JSON.parse(JSON.stringify(item));
        const component = item.component;
        itemMenu.component = async(() => import(/* webpackChunkName: "[request]" */ `@/${component}.tsx`));
        return childRouter.push(itemMenu)
      }
    })
    return childRouter
  }
  const [route, updateState] = useState([] as IMenuRoute[]);

  useEffect(() => {
    const _route = handleRouters(routes);
    updateState(_route);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  return (
    <>
      {renderRoutes(route)}
    </>
  )
}
export default BuildRoute;