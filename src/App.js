import React, {useState, Component} from 'react';
import Nav from './component/Nav/Nav';
import Contract from './component/Contract/Contract.js';
import User from './component/User/User'
import EditContract from './component/Contract/EditContract'
import {
  useQuery,
  gql
} from "@apollo/client";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Attribute from './component/Contract/Attribute';
import AddContractUser from './component/Contract/AddContractUser';

import Pet from './component/Pet/Pet';



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
   

                  <Route path="/EditContract/:id" >
                      <EditContract/>
                  </Route>
                  
                  <Route path="/contract/attribute" >
                      <Attribute/>
                  </Route>
                  <Route path="/contract/addContractUser/:idUser/:id" >
                      <AddContractUser/>
                  </Route>
                  <Route path="/pet" >
                      <Pet/>
                  </Route>


      
      
                  
      
      
                </Switch>  
    

        </Router> 
    </div>
      
  ); 

}



export default App;
