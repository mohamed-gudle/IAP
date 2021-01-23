import React from 'react'
import ReactDOM from 'react-dom';

export default class MainSection extends React.Component{
    constructor(props){
        super(props);
        this.toggleRegisterLogin = this.toggleRegisterLogin.bind(this);
        this.LoginForm = this.LoginForm.bind(this);

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
        this.fnameRef=React.createRef();
        this.lnameRef=React.createRef();

    }
    toggleRegisterLogin(){
        
        this.setState({
                 wantsToLogin : !this.state.wantsToLogin
            }
                );
                
                
    
        }
    
    register=e=>{
        e.preventDefault();
        const users1 = this.state.users.slice();   
        console.log(this.emailRef.current.value);
         users1[0] = {
            email:this.emailRef.current.value,
             password:this.passwordRef.current.value,
             lname:this.lnameRef.current.value,
             fname:this.fnameRef.current.value

         };
         console.log(users1);
        this.setState({users : users1,
       wantsToLogin:false },()=> {console.log(this.state.users)});
       ;


    }
    login=a=>{
        a.preventDefault();
        if(this.state.users!==null){
            var users=this.state.users;
        for(var i=0;i<users.length;i++){
            if(users[i].email===this.LemailRef.current.value && users[i].password===this.LpasswordRef.current.value){

                this.setState({loggedIn:true,
                wantsToLogin : "no",
                currentUser:users[i]
            });
                break;
              }
        }
    }
        //console.log("tried to login");
        
    }
    LoginForm (){
            return (
                <div>
                    <form className="centred-form" onSubmit={this.login}>
                        <div className="field">
                        
                       <label className="field-label" for="Email">Email</label>
                       <input className="field-input" ref={this.LemailRef} type="email" required="true" />
                       </div>
                       <div className="field">
                       <label className="field-label" for="Password">Password</label>
                       <input  className="field-input" ref={this.LpasswordRef} type="password" required="true"/>
                       </div>
                       <button className="primary-button">Login</button>
                    </form>
                    <button className="secondary-button" ref={this.buttonRef} text={(this.state.wantsToLogin) ? "Login" : "register"} onClick={this.toggleRegisterLogin}> Dont have an account? <span>Register</span></button>
                </div>
            )
        
        }
        RegisterForm (){
            return (
                <div>
                    <form onSubmit={this.register}>

                    <div className="field">
                        
                        <label className="field-label" for="Email">First Name</label>
                        <input className="field-input" ref={this.fnameRef} type="text" required="true" />
                     </div>
                     <div className="field">
                        
                        <label className="field-label" for="fname">Last Name</label>
                        <input className="field-input" ref={this.lnameRef} type="name" required="true" name="lname"/>
                        </div>

                       <div className="field">
                        
                       <label className="field-label" for="Email">Email</label>
                       <input className="field-input" ref={this.emailRef} type="email" required="true" />
                       </div>
                       <div className="field">
                       <label className="field-label" for="Password">Password</label>
                       <input  className="field-input" ref={this.passwordRef} type="password" required="true"/>
                       </div>
                       <button className="primary-button">Register</button>
                    </form>
                    <button className="secondary-button" ref={this.buttonRef} text={(this.state.wantsToLogin) ? "Login" : "register"} onClick={this.toggleRegisterLogin}> <span>Login</span></button>
                </div>
            )
        
        }
    render(){
        if(this.state.wantsToLogin===false){
        return (
    <main class="main">
        
        <this.LoginForm />
    </main>)
        }
        else if(this.state.wantsToLogin===true){
            return (  
                <main class="main">
            
            <this.RegisterForm />
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



