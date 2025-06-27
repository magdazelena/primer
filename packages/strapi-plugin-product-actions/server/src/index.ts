import * as controllers from "./controllers/index";
import * as routes from "./routes/product-series";
import * as services from "./services";

console.log("🚀 Product Actions Plugin Loaded!");

export default () => {
  return {
    register() {},

    controllers,
    routes,
    services,
    middlewares: {},
    bootstrap() {},
  };
};
