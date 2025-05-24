import React from "react";
import { useRoutes } from "react-router-dom";
import MetaManager from './components/MetaManager';
import routes from "./routes";
import "./App.css";

function App() {
  const routing = useRoutes(routes);
  return  (
    <>
      <MetaManager />
      {routing}
    </>
  );
}

export default App;
