import { productSeries as controllers } from "./controllers";
import { productSeriesRoutes as routes } from "./routes";
import { productSeriesService as services } from "./services";
import { register } from "./register";
import { bootstrap } from "./bootstrap";

export const plugin = () => {
  return {
    register,

    controllers,
    routes,
    services,
    middlewares: {},
    bootstrap,
  };
};
