// @ts-nocheck

import Navbar from "./Componentes/NavBar/NavBar";
import Main from "./Componentes/Main/Main";
import Footer from "./Componentes/Footer/Footer";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import ContextProvider from "./Componentes/Context/ReactContext";
import "./app.scss";
import UpdateFeeder from "./Componentes/updateFeeder/updateFeeder";
import ContextProviderUpdate from "./Componentes/updateFeeder/updateContext";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import NotFound from "./Componentes/NotFound/NotFound";
import Success from "./Componentes/updateFeeder/updateForm/Success/Success";
import Agregar from "./Componentes/Agregar/Agregar";

const theme = createTheme({
  type: "light",
  theme: {
    colors: {
      // brand colors
      primary: "#50723C",
      secondary: "#0098FF",

      // ...  more colors
    },
    space: {},
    fonts: {
      sans: "Kumbh Sans",
    },
  },
});

function App() {
  return (
    <NextUIProvider theme={theme}>
      <ContextProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Main}></Route>
            <Route exact path="/success" component={Success}></Route>
            <Route exact path="/agregar" component={Agregar}></Route>
            <ContextProviderUpdate>
              <Route exact path="/update/:id" component={UpdateFeeder}></Route>
            </ContextProviderUpdate>
            <Route component={NotFound}> </Route>
          </Switch>
          <Footer />
        </Router>
      </ContextProvider>
    </NextUIProvider>
  );
}

export default App;
