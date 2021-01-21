import React from 'react'
import ReactDOM from 'react-dom';
import SecondaryButton, { LoginForm } from './Components'

export default class MainSection extends React.Component{
    constructor(props){
        super(props);
        this.toggleRegisterLogin = this.toggleRegisterLogin.bind(this);
        this.LoginForm = this.LoginForm.bind(this);
        this.LoginRegisterNav =this.LoginRegisterNav.bind(this);
        this.RegisterForm=this.RegisterForm.bind(this);
        this.login=this.login.bind(this);
        this.register=this.register.bind(this);
        this.state={
            users: Array(9).fill(null),
            loggedIn : false,
            wantsToLogin : false,
            currentUser : null
            
        };
        this.emailRef=React.createRef();
        this.passwordRef=React.createRef();
        this.LemailRef=React.createRef();
        this.LpasswordRef=React.createRef();

    }
    toggleRegisterLogin(){
        
        this.setState({
                 wantsToLogin : !this.state.wantsToLogin
            }
                );
                
                
    
        }
    LoginRegisterNav(){
            return(
            <nav class="login-register-nav">
            <SecondaryButton ref={this.buttonRef} text={(this.state.wantsToLogin) ? "Login" : "register"} onClick={this.toggleRegisterLogin}/>
            
            </nav>
        )
        }
    register=e=>{
        e.preventDefault();
        const users = this.state.users.slice();   
         users[0] = {
            email:this.emailRef.current.value,
             password:this.passwordRef.current.value,
         };
        this.setState({users : users,
       wantsToLogin:true });


    }
    login=e=>{
        e.preventDefault();
        this.state.users.forEach(user =>{
            if(user.email===this.LemailRef.current.value && user.password===this.LpasswordRef.current.value){
              this.setState({loggedIn:true});
            }
        });
        console.log("tried to login");

    }
    LoginForm (){
            return (
                <div>
                    <form onSubmit={this.login}>
                       <label for="Email">Email</label>
                       <input ref={this.LemailRef} type="email" required="true" placeholder="Email"/>
                       <label for="Password">Password</label>
                       <input ref={this.LpasswordRef} type="password" required="true"/>
                       <button>Login</button>
                    </form>
                </div>
            )
        
        }
        RegisterForm (){
            return (
                <div>
                    <form onSubmit={this.register}>
                       <label for="Email">Email</label>
                       <input ref={this.emailRef} type="email" required="true" placeholder="Email"/>
                       <label for="Password">Password</label>
                       <input ref={this.passwordRef} type="password" required="true"/>
                       
                       <button >Register</button>
                    </form>
                </div>
            )
        
        }
    render(){
        if(this.state.wantsToLogin===false){
        return (
    <main class="main">
        <this.LoginRegisterNav />
        <LoginForm />
    </main>)
        }
        else if(this.state.wantsToLogin){
            return (  
                <main class="main">
            <this.LoginRegisterNav />
            <this.RegisterForm />
        </main>)
        }
        else if(this.state.loggedIn){
            return( <main class="main">
           <label>{this.state.users[0].email}</label>
        </main>)
        }
            
        
    
    }
}



