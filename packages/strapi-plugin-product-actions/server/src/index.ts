import controllers from "./controllers";
import routes from "./routes";
import services from "./services";
import register from "./register";
import bootstrap from "./bootstrap";

console.log("🚀 Product Actions Plugin Loaded!");

export default () => {
  return {
    register,

    controllers,
    routes,
    services,
    middlewares: {},
    bootstrap,
  };
};
