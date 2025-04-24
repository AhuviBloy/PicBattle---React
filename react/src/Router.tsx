// import { createBrowserRouter } from "react-router-dom";
// import HomePage from "./components/HomePage";
// import ChallengeList from "./components/challenge/ChallengeList";
// import CreationCarousel from "./components/creation/CreationCarousel";

// export const myRouter = createBrowserRouter([
//   {
//     path: '/',
//     element: <HomePage />,
//     errorElement: <>main error</>,
//     children: [],
//   },
//   {
//     path: 'challengeList',
//     element: <ChallengeList />,
//     children: [],
//   },
//   {
//     path: 'creationsForChallenge/:challengeId',
//     element: <CreationCarousel />,
//     children: [],
//   },
// ]);

import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import ChallengeList from "./components/challenge/ChallengeList";
import CreationCarousel from "./components/creation/CreationCarousel";
import Layout from "./Layout";
import UpdateUser from "./components/user/UpdateUser";

export const myRouter = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <HomePage />,
  //   errorElement: <>main error</>,
  //   children: [],
  // },
  {
    path: "/",
    element: <Layout />,
    errorElement: <>main error</>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "challengeList",
        element: <ChallengeList />,
      },
      {
        path: "creationsForChallenge/:challengeId",
        element: <CreationCarousel />,
      },
      {
        path: "edit-profile",
        element: < UpdateUser />,
      },
    ],
  },
]);
