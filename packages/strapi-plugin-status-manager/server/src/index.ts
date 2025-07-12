import { bootstrap } from "./bootstrap";
import contentTypes from "./content-types/index";
import { controllers } from "./controllers";
import { register } from "./register";
import { routes } from "./routes";
import { services } from "./services";

export const plugin = () => {
  const pluginConfig = {
    register,
    controllers,
    contentTypes,
    routes,
    services,
    bootstrap,
  };

  return pluginConfig;
};
