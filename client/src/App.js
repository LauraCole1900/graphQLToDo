import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import { LandingPage, NotFound, ToDoListPage } from "./pages";
import { ToDoProvider, useToDo } from "./utils";
import './App.css';

const httpLink = createHttpLink({
  uri: "/graphql"
});

// Sets authentication into context
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
});

// Instantiates the client object and the cache object with some specific options
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const App = () => {
  const { toDo, setToDo, btnName, setBtnName } = useToDo();

  return (
    <ApolloProvider client={client}>
      <Router>
        <ToDoProvider value={{ toDo, setToDo, btnName, setBtnName }}>
          <Switch>
            <Route path="/mytodos/*" component={ToDoListPage} />
            <Route exact path="/" component={LandingPage} />
            <Route component={NotFound} />
          </Switch>
        </ToDoProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
