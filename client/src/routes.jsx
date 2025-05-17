import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Loadable from "./utils/Loadable";
import PrivateRoute from "./components/PrivateRoute";
import AccessDenied from "./components/AccessDenied";

// Ленивая загрузка страниц для оптимизации производительности
const Home = lazy(() => import("./pages/Home"));
const Courses = lazy(() => import("./pages/Courses"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Faq = lazy(() => import("./pages/Faq"));

const Articles = lazy(() => import("./pages/Articles"));
const Profile = lazy(() => import("./pages/Profile"));

const BrowsOnlineVi = lazy(() => import("./pages/promotion/BrowsOnlineVi"));
const LipsOnlineVi = lazy(() => import("./pages/promotion/LipsOnlineVi"));

const PurchasedCourse = lazy(() => import("./pages/exclusive/PurchasedCourse"));
//const LipsOnline = lazy(() => import("./pages/exclusive/LipsOnline"));


// Создаем компоненты с оберткой для ленивой загрузки
const LoadableHome = Loadable(Home);
const LoadableCourses = Loadable(Courses);
const LoadableGallery = Loadable(Gallery);
const LoadableFaq = Loadable(Faq);

const LoadableArticles = Loadable(Articles);
const LoadableProfile = Loadable(Profile);

const LoadableABrowsOnlineVi = Loadable(BrowsOnlineVi);
const LoadableipsOnlineVi = Loadable(LipsOnlineVi);

const LoadableAPurchasedCourse = Loadable(PurchasedCourse);
//const LoadableipsOnline = Loadable(LipsOnline);

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Navigate to="/home" /> },
      { path: "home", element: <LoadableHome /> },
      { path: "coursesGroup", element: <LoadableCourses /> },
      { path: "gallery", element: <LoadableGallery /> },
      { path: "faq", element: <LoadableFaq /> },

      //создаем защищенные маршруты
      { path: "profile",
        element: ( <PrivateRoute>
                    <LoadableProfile />
                  </PrivateRoute> ), },
      { path: "articles",
        element: ( <PrivateRoute>
                    <LoadableArticles />
                  </PrivateRoute> ), },

      { path: "onlineBrowsVi",
        element: ( <PrivateRoute>
                  <LoadableABrowsOnlineVi />
                </PrivateRoute> ), },
      { path: "onlineLipsVi",
        element: ( <PrivateRoute>
                <LoadableipsOnlineVi />
              </PrivateRoute> ), },

      //маршруты для оплаченых курсов
      { path: "courses/:courseId", element: <LoadableAPurchasedCourse /> },
      //{ path: "courses/lips", element: <LoadableipsOnline /> },
      { path: "access-denied", 
        element: ( <PrivateRoute>
                    <AccessDenied />
                  </PrivateRoute>), },

      { path: "*", element: <Navigate to="/home" /> },
    ],
  },
];

export default routes;
