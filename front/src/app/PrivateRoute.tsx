import { Outlet } from "react-router-dom";

export const PrivateRoute = () => (
  // if (!authKey) {
  //   if (authKey === "false") {
  //     localStorage.setItem(AUTH_KEY, "false");
  //   }
  //   return <Navigate to={PATHS.SIGNIN} state={{ from: location }} replace />;
  // }

  <Outlet />
);
