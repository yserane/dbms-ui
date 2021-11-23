import React from 'react';
import './App.css';
import UsabilityTable from './Components/UsabilityTable/UsabilityTable';

import Products from './Components/Products/Product';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Survey from './Components/Surveys/Survey';

class App extends React.Component {
  constructor(){
    super();

  }
  render() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        UX Studies Database
      </header>
      </div>
      <Switch>
        <Route exact path="/">
          <Products/>
        </Route>
        <Route path="/UsabilityStudy/:productId">
          <UsabilityTable/>
        </Route>

        <Route path= "/survey/:uId">
          <Survey/>
        </Route>
  </Switch>
  </Router>

  );
  }
}

export default App;
