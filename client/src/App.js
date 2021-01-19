import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { Provider } from 'react-redux'
import Home from "./pages/Home";
// import Detail from "./pages/Detail";
//import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Header from "./components/header";
import store from "./redux/store";
// import OrderHistory from "./pages/OrderHistory";
// import Success from "./pages/Success"
// import store from '../src/utils/store';

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: 'http://localhost:3001/graphql',
})


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
           <Provider store={store}> 
            <Header /> 
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/cart" component={Cart} />
              {/* <Route component={NoMatch} /> */}
            </Switch>
           </Provider> 
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
