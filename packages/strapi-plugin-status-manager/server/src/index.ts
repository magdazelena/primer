import bootstrap from "./bootstrap";
import contentTypes from "./content-types/index";
import controllers from "./controllers";
import register from "./register";
import routes from "./routes";
import services from "./services/index";

export default () => {
  try {
    const plugin = {
      register,
      controllers,
      contentTypes,
      routes,
      bootstrap,
    };

    console.log("✅ Server components loaded successfully");
    console.log("🔧 ========================================");

    return plugin;
  } catch (error) {
    console.error("❌ Error loading server components:", error);
    console.log("🔧 ========================================");
    throw error;
  }
};
