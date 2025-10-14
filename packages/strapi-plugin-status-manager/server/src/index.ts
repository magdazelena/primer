import { bootstrap } from "./bootstrap";
import contentTypes from "./content-types/index";
import { controllers } from "./controllers";
import { register } from "./register";
import { routes } from "./routes";
import { services } from "./services";
import { middlewares } from "./middlewares";

const plugin = () => {
  const pluginConfig = {
    register,
    controllers,
    contentTypes,
    routes,
    middlewares,
    services,
    bootstrap,
  };

  return pluginConfig;
};

export default plugin;
