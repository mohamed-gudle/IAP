import React from 'react'
export default class RegisterForm extends React.Component{
   
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

    render (){
        return (
            <div>
                <form action="http://localhost/decode/userIndex.php " method="POST">

                <input value="register" name="event" type="hidden"/>
                <div className="field">
                    
                    <label className="field-label" for="fullName">Full Name</label>
                    <input className="field-input" name="fullName" type="text" required="true" />
                 </div>
                 

                   <div className="field">
                    
                   <label className="field-label" for="username">Usernaame</label>
                   <input className="field-input"  required="true"name="username" />
                   </div>
                   <div className="field">
                   <label className="field-label" for="Password">Password</label>
                   <input  className="field-input"  type="password" required="true" name="password"/>
                   </div>
                   <button className="primary-button" type="button">Register</button>
                </form>
                
            </div>
        )
    
    }
}