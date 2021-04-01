import React from 'react'
import "../css/form.css";

export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.form = React.createRef();
        this.register = this.register.bind(this);
        this.state = {
            errorMessage: "",
            displayError: { display: 'none' }
        }
    }

    register (event) {
        event.preventDefault();
        var xhttp = new XMLHttpRequest();
        var formData = new FormData(event.target);
        let _this = this;
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var user=JSON.parse(this.responseText);
                console.log(user);
                if (user.registered=== true) {  
                    localStorage.setItem('user',this.responseText);
                    window.location.href = "/";
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
                <form ref={this.form} name="form" className="centred-form" onSubmit={this.register} enctype='multipart/form-data'>

                    <input value="register" name="event" type="hidden" />
                    <div className="field">

                        <label className="field-label" for="fullName">Full Name</label>
                        <input className="field-input" name="fullName" type="text" required="true" />
                    </div>



                    <div className="field">

                        <label className="field-label" for="username">Usernaame</label>
                        <input className="field-input" required="true" name="username" />
                    </div>
                    <div className="field">
                        <label className="field-label" for="Password">Password</label>
                        <input className="field-input" type="password" required="true" name="password" />
                    </div>
                    <div className="field">
                        <label className="field-label" for="cityOfResidence">City Of Residence</label>
                        <input className="field-input" type="text" required="true" name="cityOfResidence" />
                    </div>
                    <div className="field">

                        <label className="field-label" for="profilePhoto">upload profile</label>
                        <input className="secondary-button" name="profilePhoto" type="file" required="true" />
                    </div>
                    <button className="primary-button" >Register</button>
                </form>

            </div>
        )

    }
}