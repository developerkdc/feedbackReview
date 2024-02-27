import React from "react";
import Home from "../pages/home";
import Page from "@jumbo/shared/Page";
import Feedback from "app/pages/feedback/Feedback";
import MapQuestion from "app/pages/MapQuestion/MapQuestion";
import MetricsPage from "app/pages/metrics/Metrics";
import Survey from "app/pages/Survey/Survey";
import Review from "app/pages/QuestionAndAnswer/Review";
import Mall from "app/pages/mall/addMall";
import AddMall from "app/pages/mall/addMall";
import EditMall from "app/pages/mall/editMall";
import ListMall from "app/pages/mall/listMall";

/**
 routes which you want to make accessible to both authenticated and anonymous users
 **/
const routesForPublic = [
  {
    path: "/",
    element: <Page component={Home} />,
  },
  {
    path: "/mall",
    element: <Page component={ListMall} />,
  },
  {
    path: "/mall-add",
    element: <Page component={AddMall} />,
  },
  {
    path: "/mall-edit/:id",
    element: <Page component={EditMall} />,
  },
  {
    path: "/feedback",
    element: <Page component={Feedback} />,
  },
  {
    path: "/questions",
    element: <Page component={MapQuestion} />,
  },
  {
    path: "/metric",
    element: <Page component={MetricsPage} />,
  },
  {
    path: "/survey",
    element: <Page component={Survey} />,
  },
  {
    path: "/review",
    element: <Page component={Review} />,
  },
];

/**
 routes only accessible to authenticated users
 **/
const routesForAuthenticatedOnly = [];

/**
 routes only accessible when user is anonymous
 **/
const routesForNotAuthenticatedOnly = [];

const routes = [
  ...routesForPublic,
  ...routesForAuthenticatedOnly,
  ...routesForNotAuthenticatedOnly,
];

export {
  routes as default,
  routesForPublic,
  routesForNotAuthenticatedOnly,
  routesForAuthenticatedOnly,
};
