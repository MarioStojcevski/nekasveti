import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import Summary from "./pages/Summary";
import Schedule from "./pages/Schedule";
import Services from "./pages/Services";

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: '/',
        Component: Home,
      },
      {
        path: '/services',
        Component: Services,
      },
      {
        path: '/schedule',
        Component: Schedule,
      },
      {
        path: '/summary',
        Component: Summary,
      },
      {
        path: '*',
        Component: () => <div>404 Not Found</div>,
      },
    ]
  },
  {
    path: '*',
    Component: () => <div>404 Not Found</div>,
  }
]);

export default router;