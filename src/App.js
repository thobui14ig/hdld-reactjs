import React, {useState} from 'react';
import Nav from './component/Nav/Nav';
import Contract from './component/Contract/Contract.js';
import User from './component/User/User'
import EditContract from './component/Contract/EditContract'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";



function App() {  
  return (  
    <div> 
              
        <Router>
            <Nav/>
            <Switch>
                  <Route path="/contract" exact>
                      <User/>
                  </Route>
                  <Route path="/newContract" exact>
                      <Contract/>
                  </Route>
                  <Route path="/EditContract" exact>
                      <EditContract/>
                  </Route>



      
      
                  
      
      
                </Switch>  
    

        </Router> 
    </div>
      
  ); 

}

export default App;
