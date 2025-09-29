import statusManagement from "./status-management";
import contentManagement from "./content-management";
import listManagement from "./list-management";

const routes = {
  admin: {
    type: "admin",
    routes: [...statusManagement, ...contentManagement, ...listManagement],
  },
};

export { routes };
