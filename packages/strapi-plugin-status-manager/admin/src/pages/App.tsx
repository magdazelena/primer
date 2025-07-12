//@ts-ignore
import { DesignSystemProvider, lightTheme } from "@strapi/design-system";
import { Page } from "@strapi/strapi/admin";
import { Routes, Route } from "react-router-dom";

import { HomePage } from "./HomePage";

const App = () => {
  return (
    <DesignSystemProvider locale="en-GB" theme={lightTheme}>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="*" element={<Page.Error />} />
      </Routes>
    </DesignSystemProvider>
  );
};

export default App;
