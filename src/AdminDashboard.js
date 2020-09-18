import React from 'react'
import axios from 'axios'
//import moment from 'moment'

class AdminDashboard extends React.Component{
    constructor(){
        super()
        this.state = {
            candidates:[],
            default:'Front-End Developer'
            
        }
    }
     componentDidMount(){
        axios.get('http://dct-application-form.herokuapp.com/users/application-forms')
    .then((response) => {
        const candidates = response.data
        this.setState({candidates})
        
        
    })
    .catch((err) => {
        console.log(err)
    })

    }
    handleChange = (title) => {
        this.setState({default:title})
    }
    handleViewDetails =(id) => {
        axios.get(`http://dct-application-form.herokuapp.com/users/application-form/${id}`)
        .then((response) => {
            const candidate = response.data
            alert(`name ${candidate.name} Contact number ${candidate.phone} Email ${candidate.email} Skills ${candidate.skills} Experience ${candidate.experience}`)
        })
    }
    handleStatus=(id,status)=>{
        axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${id}`, {status})
        .then((response)=>{
            console.log(response.data)
            const candidates=response.data
            alert(`form has been ${candidates.status}`)
            this.setState(prevState=>({
                candidates:prevState.candidates.map(ele=>{
                    if(ele._id===candidates._id)
                    {
                        return {...candidates}
                    }
                    else{
                        return {...ele}
                    }
                })
            }))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    render(){
        return(
            <div>
                <h2>Admin Dashboard</h2>
                <button onClick={() => {
                    this.handleChange('Front-End Developer')
                }}>Front-End Developer</button>
                <button onClick={() => {
                    this.handleChange('Node.js Developer')
                }}>Node.js Developer</button>
                <button onClick={() => {
                    this.handleChange('MEAN Stack Developer')
                }}>MEAN Stack Developer</button>
                <button onClick={() => {
                    this.handleChange('FULL Stack Developer')
                }}>FULL Stack Developer</button>

                <h1>{this.state.default}s</h1>
                <p>list of candidates applied for {this.state.default} job </p>

                <table>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>Technical Skills</th>
                            <th>experience</th>
                            <th>Applied date</th>
                            <th>View Details</th>
                            <th>Update Application status</th>
                        </tr>
                    </thead>
                            <tbody>
                                {
                                     this.state.candidates.filter(candidate=> candidate.jobTitle=== this.state.default).map(candidate => {
                                         return(
                                             <tr key ={candidate.id}>
                                                 <td>{candidate.name}</td>
                                                 <td>{candidate.skills}</td>
                                                 <td>{candidate.experience}</td>
                                                 <td>{moment(candidate.createdAt).format("DD/MM/YYYY")}</td>
                                                 <td><button onClick = {() => {
                                                     this.handleViewDetails(candidate._id)
                                                 }}>view Details</button></td>
                                                 <td>
                                                     
                                                 {candidate.status==='applied'?(
                                            <div>
                                                <button onClick={()=>{
                                                    this.handleStatus(candidate._id,'shortlisted')
                                                }}>shortlist</button>
                                                <button onClick={()=>{
                                                    this.handleStatus(candidate._id,'rejected')
                                                }}>reject</button>
                                            </div>
                                        ):(
                                            <button>{candidate.status}</button>
                                        )}
                                                     </td>
                                                   
                                             </tr>

                                         )

                                     })
                                }
                               
                            </tbody>
                </table>
            </div>
        )
    }
}
export default AdminDashboard