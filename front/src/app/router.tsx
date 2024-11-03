import CurrentMindMap from "@modules/mindmap/CurrentMindMap";
import { ProfilePage } from "@modules/user/profile";
import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import { PATHS } from "@shared/constants";
import { Spinner } from "@shared/ui/spinner";

import { AppLayout } from "./AppLayout";
import { PrivateRoute } from "./PrivateRoute";

const MindMapPage = lazy(() => import("@modules/mindmap"));

const UpdatePage = lazy(() => import("@modules/upload"));

export const routes = createBrowserRouter([
  // {
  //   element: <AuthLayout />,
  //   children: [
  //     {
  //       path: PATHS.SIGNIN,
  //       element: <SignInPage />
  //     },
  //     {
  //       path: PATHS.SIGNUP,
  //       element: <SignUpPage />
  //     }
  //   ]
  // },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Spinner />}>
            <UpdatePage />
          </Suspense>
        )
      },
      {
        path: PATHS.MINDMAP,
        element: (
          <Suspense fallback={<Spinner />}>
            <MindMapPage />
          </Suspense>
        )
      },
      {
        path: PATHS.MINDMAP + "/:uid",
        element: (
          <Suspense fallback={<Spinner />}>
            <CurrentMindMap />
          </Suspense>
        )
      }
    ]
  },
  // {
  //   path: PATHS.OAUTH_YANDEX,
  //   element: <YandexCallback />
  // },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: PATHS.PROFILE,
        element: <ProfilePage />
      }
    ]
  }
]);
