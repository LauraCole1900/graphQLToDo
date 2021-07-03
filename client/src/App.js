import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { LandingPage, NotFound, ToDoListPage } from "./pages";
import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/mytodos" component={ToDoListPage} />
        <Route exact path="/" component={LandingPage} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
