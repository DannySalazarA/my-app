import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from './logo.svg';
import './App.css';

import AddActivity from './components/add-activity.component'
import ActivityList from './components/activity-list.component'
import Activity from './components/activity.component'
//import PropertyList from './components/property.component'

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/activities" className="navbar-brand">
            TrueHome
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/activities"} className="nav-link">
                Activities
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li> */}
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/activities"]} component={ActivityList} />
            <Route exact path="/add/:propId/:propName" component={AddActivity} />
            <Route path="/activities/:id" component={Activity} />
            {/* <Route path="/properties" component={PropertyList} /> */}
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }