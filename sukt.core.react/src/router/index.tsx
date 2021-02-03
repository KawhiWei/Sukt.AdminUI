import React, { Suspense } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import RouterAuth from "@/component/routeAuth";
import NotFound from "@/router/constans/notFound";
import Login from "@/router/constans/login";
const routes = [
  ...Login,
  ...NotFound
];
// function BasicRoute() {
// 	return (
// 		<BrowserRouter>
// 			<Switch>
// 				<Suspense fallback={<div>Loading...</div>}>
// 					<RouterAuth config={routes} />
// 				</Suspense>
// 			</Switch>
// 		</BrowserRouter>
// 	)
// }


class BasicRoute extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Suspense fallback={<div>Loading...</div>}>
            <RouterAuth config={routes} />
          </Suspense>
        </Switch>
      </BrowserRouter>
    )
  }
}
export default BasicRoute;