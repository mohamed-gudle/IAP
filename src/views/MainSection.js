import React from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'


export default class MainSection extends React.Component{
    constructor(props){
        super(props);
        this.toggleRegisterLogin = this.toggleRegisterLogin.bind(this);
        this.changeFormButton=this.changeFormButton.bind(this);
        this.state={
            users: Array(9).fill(null),
            loggedIn : false,
            wantsToLogin : false,
            currentUser : null
            
        };

    }
    toggleRegisterLogin(){
        
        this.setState({
                 wantsToLogin : !this.state.wantsToLogin
            }
                );
                
                
    
        }
    changeFormButton(props) {
        return(
            <button className="secondary-button" ref={this.buttonRef} text={(this.state.wantsToLogin) ? "Login" : "register"} onClick={this.toggleRegisterLogin}> <span>{props.spanText}</span>{props.text}</button>
        )
        }
    render(){
        if(this.state.wantsToLogin===false){
        return (
    <main class="main">
        
        <LoginForm />
        <this.changeFormButton spanText="Dont have an account?" text="Register"/>

    </main>)
        }
        else if(this.state.wantsToLogin===true){
            return (  
                <main class="main">
            
            <RegisterForm />
            
            <this.changeFormButton spanText="Already registered ?" text="Login"/>
        </main>)
        }
        else if(this.state.loggedIn){
            return( <main class="main">
           <article>
               <h1>
                   Welcome Back <strong>{this.state.currentUser.fname}  {this.state.currentUser.lname}</strong>


               </h1>
               <button className="primary-button">Log out</button>
           </article>
        </main>)
        }
            
        
    
    }
}



