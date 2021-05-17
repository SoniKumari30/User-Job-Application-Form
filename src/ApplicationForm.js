import React from 'react'
import axios from 'axios'

class ApplicationForm extends React.Component{
 
    constructor(){
        super()
        this.state = {
            name: '',
            email:'',
            contact: '',
            job: '',
            experience: '',
            skills: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.contact,
            jobTitle: this.state.job,
            experience: this.state.experience,
            skills: this.state.skills
        }
        
        
        axios.post('http://dct-application-form.herokuapp.com/users/application-form',formData)
        .then((response) => {
            
            alert('your form has been submitted')
            this.setState({
                name:'',
                email:'',
                contact:'',
                job:'',
                experience:'',
                skills:''        
            })
        
    })
        
        
        .catch((err) => {
            console.log(err)
        })
    
            
          
    }

    render(){
        return(
        <div>


        <h1>Apply For Job</h1>

                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="fullName">Full name</label>
                    <input 
                        id="fullName"
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <br/>

                    
                    <label htmlFor="email">Email address</label>
                    <input 
                        id="email"
                        type="text"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        placeholder = "example@gmail.com"
                    />
                    <br/>
                    

                    
                    <label htmlFor="contact">Contact number</label>
                    <input 
                        id="contact"
                        type="text"
                        name="contact"
                        value={this.state.contact}
                        onChange={this.handleChange}
                        placeholder = "+91 9815758474"
                    />
                    <br/>
                    
                    <label>Applying For Job</label>
                        <select value={this.state.job} name = "job" onChange={this.handleChange} >  
                         <option value = "" >----Select----</option>
                            <option value = "Front-End Developer">Front-End Developer</option>
                            <option value = "Node.js Developer">Node.js Developer</option>
                            <option value = "MEAN Stack Developer">MEAN Stack Developer</option>
                            <option value = "FULL Stack Developer">FULL Stack Developer</option>
                        </select>
                        <br/>
                        
                    
                    <label htmlFor="experience">Experience</label>
                    <input 
                        id="experience"
                        type="text"
                        name="experience"
                        value={this.state.experience}
                        onChange={this.handleChange}
                        placeholder = "experience (2 years,3 months)"
                    />
                    <br/>
                    
                    <label htmlFor="Skills">Technical Skills</label>
                    <textarea
                        id="Skills"
                        type="text"
                        name="skills"
                        value={this.state.skills}
                        onChange={this.handleChange}
                        placeholder = "Technical Skills"
                    ></textarea>
                    <br/>
                    
                    <input type="submit" value="send Application" />
                </form>
             </div>
            

        )
    }
}

export default ApplicationForm