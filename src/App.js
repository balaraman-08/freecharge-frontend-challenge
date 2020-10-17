import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./home/Home";
import FailedPage from "./payment/FailedPage";
import PaymentPage from "./payment/PaymentPage";
import SuccessPage from "./payment/SuccessPage";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/payment">
          <PaymentPage />
        </Route>
        <Route path="/success">
          <SuccessPage />
        </Route>
        <Route path="/failed">
          <FailedPage />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
