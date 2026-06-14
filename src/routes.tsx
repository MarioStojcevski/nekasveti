import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Schedule from "./pages/Schedule";
import ClientInfo from "./pages/ClientInfo";
import Summary from "./pages/Summary";
import Confirmation from "./pages/Confirmation";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { path: "/", Component: Home },
      { path: "/services", Component: Services },
      { path: "/schedule", Component: Schedule },
      { path: "/client-info", Component: ClientInfo },
      { path: "/summary", Component: Summary },
      { path: "/confirmation", Component: Confirmation },
      { path: "*", Component: () => <div className="text-white text-center py-20">404 Not Found</div> },
    ],
  },
], {
  basename: "/nekasveti/",
});

export default router;
