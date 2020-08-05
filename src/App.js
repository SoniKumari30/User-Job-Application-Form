import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import ApplicationForm from './ApplicationForm'
import Admindashboard from './AdminDashboard'


function App (props) {
    return (
        <BrowserRouter>
         <div>
            <h1>USER JOB APPLICATION APP</h1>
               <Link to="/">ApplicationForm</Link> |
               <Link to="/admin">AdminDashboard </Link> 


             <Route path = "/" component={ApplicationForm}  exact = {true }/>
             <Route path = "/admin" component={Admindashboard} />
            
        </div>
        </BrowserRouter>
       
    )
}

export default App