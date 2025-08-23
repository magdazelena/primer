import statusManagement from "./status-management";
import contentManagement from "./content-management";

const routes = {
  admin: {
    type: "admin",
    routes: [...statusManagement, ...contentManagement],
  },
};

export { routes };
