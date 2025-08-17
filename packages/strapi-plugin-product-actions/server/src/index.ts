import { controllers } from "./controllers";
import { routes } from "./routes";
import { services } from "./services";
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

export default plugin;
