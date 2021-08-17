import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import HeaderNew from "./components/HeaderNew";
import SolutionsNew from "./pages/SolutionsNew";
import CompassTool from "./pages/CompassTool";
import VastuTool from "./pages/VastuTool";
import VastuToolScore from "./pages/VastuToolScore";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
    <HeaderNew />
      <Switch>

        <Route path="/" exact>
          <Redirect to="/SolutionsNew" />
        </Route>

        <Route path="/SolutionsNew" exact>
          <SolutionsNew />
        </Route>

        {/* <Route path="/quotes/:quoteId">
            <QuoteDetail />
          </Route> */}

        <Route path="/compasstool">
          <CompassTool />
        </Route>

        <Route path="/vastutool">
          <VastuTool />
        </Route>

        <Route path="/vastutoolscore">
          <VastuToolScore />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
