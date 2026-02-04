import statusManagement from "./status-management";
import contentManagement from "./content-management";

export default {
  admin: {
    type: "admin",
    routes: [...statusManagement, ...contentManagement],
  },
};

