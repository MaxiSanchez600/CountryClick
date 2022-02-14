// @ts-nocheck

import Navbar from "./Componentes/NavBar/NavBar";
import Main from "./Componentes/Main/Main";
import Footer from "./Componentes/Footer/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ContextProvider from "./Componentes/Context/ReactContext";
import "./app.scss";
import UpdateFeeder from "./Componentes/updateFeeder/updateFeeder";
import ContextProviderUpdate from "./Componentes/updateFeeder/updateContext";
import { createTheme, NextUIProvider } from "@nextui-org/react";

const theme = createTheme({
  type: "light",
  theme: {
    colors: {
      // brand colors
      primary: "#02C55E",
      secondary: "#0098FF",

      // ...  more colors
    },
    space: {},
    fonts: {},
  },
});

function App() {
  return (
    <NextUIProvider theme={theme}>
      <ContextProvider>
        <Router>
          <Route path="/" component={Navbar}></Route>
          <Switch>
            <Route exact path="/" component={Main}></Route>
            <ContextProviderUpdate>
              <Route path="/update/:id" component={UpdateFeeder}></Route>
            </ContextProviderUpdate>
          </Switch>
          <Route path="/" component={Footer}></Route>
        </Router>
      </ContextProvider>
    </NextUIProvider>
  );
}

export default App;
