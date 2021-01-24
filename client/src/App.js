import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { Provider } from 'react-redux'
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Header from "./components/header";
import store from "./redux/store";
<<<<<<< HEAD
// import OrderHistory from "./pages/OrderHistory";
// import Success from "./pages/Success"
=======
import OrderHistory from "./pages/OrderHistory";
import Success from "./pages/Success"
import Messages from "./components/Messages";


>>>>>>> main

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
         
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/orderHistory" component={OrderHistory} />
              <Route exact path="/success" component={Success} />
              {/* <Route component={NoMatch} /> */}
              <Route exact path="/messages" component={Messages} />
            </Switch>
           </Provider> 
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
