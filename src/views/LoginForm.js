import React from 'react'
import "../css/form.css";


export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.form = React.createRef();
        this.login = this.login.bind(this);
        this.state = {
            errorMessage: "",
            displayError: { display: 'none' }
        }
    }
    
 

    login(event) {
        event.preventDefault();
        var xhttp = new XMLHttpRequest();
        var formData = new FormData(event.target);
        let _this = this;
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var user=JSON.parse(this.responseText);
                console.log(user);
                if (user.verified=== true) {  
                    localStorage.setItem('user',this.responseText);
                    window.location.href = "/profile";
                }
                else {
                    _this.setState({
                        errorMessage: user.errorMessage,
                        displayError: { display: 'block' }
                    })
                }
            }
        };
        xhttp.open("POST", "http://localhost/serverLogic/index.php", true);


        console.log(formData);
        xhttp.send(formData);

    }

    render() {
        return (
            <div>
                <div class="alert" style={this.state.displayError}>
                    {this.state.errorMessage}
                </div>
                <form ref={this.form} name="form" className="centred-form" onSubmit={this.login}>
                    <div className="field">

                        <input value="login" name="event" type="hidden" />
                        <label className="field-label" for="Email">Username</label>
                        <input className="field-input" type="text" required="true" name="username" />
                    </div>
                    <div className="field">
                        <label className="field-label" for="Password">Password</label>
                        <input className="field-input" type="password" required="true" name="password" />
                    </div>
                    <button className="primary-button"  >Login</button>
                </form>

            </div>
        )


    }
}
