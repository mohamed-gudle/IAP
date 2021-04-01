import React from "react"
import "../css/profile.css";
import ChangePasswordForm from "./ChangePasswordForm";
export default class AccountPage extends React.Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
    this.myForm=React.createRef();
    this.openForm=this.openForm.bind(this);
    this.closeForm=this.closeForm.bind(this);
    this.logout = this.logout.bind(this);
    this.changePassword=this.changePassword.bind(this);
    this.state = {
      errorMessage: "",
      displayError: { display: 'none' },
      displayForm: { display: 'none' },
      displayOtherComponents:{display:'block'}
    }
  }
  logout(event) {
    event.preventDefault();
    var xhttp = new XMLHttpRequest();
    var formData = new FormData(event.target);
    let _this = this;
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        localStorage.removeItem('user');
        window.location.href = "/";
      }

    };
    xhttp.open("POST", "http://localhost/serverLogic/index.php", true);


    console.log(formData);
    xhttp.send(formData);


  }
  changePassword(event){
    event.preventDefault();
    var xhttp = new XMLHttpRequest();
    var formData = new FormData(event.target);
    let _this = this;
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        
        _this.setState({errorMessage:this.responseText,displayError:{display:'block'}});
      }

    };
    xhttp.open("POST", "http://localhost/serverLogic/index.php", true);


    console.log(formData);
    xhttp.send(formData);

  }
  
  
  openForm() {
     this.setState({displayForm:{display:'block'},
    displayOtherComponents:{display :"none"}});
  }
  
  closeForm() {
    this.setState({displayForm:{display:'none'},
    displayOtherComponents:{display :"block"}});
  }
  render() {
    return (
      <React.Fragment>
        <div className="card">


          <div className="p-profile">
            <img src={"http://localhost/serverLogic/profilePhotos/" +
              JSON.parse(localStorage.getItem("user")).profilePhoto}></img>
          </div>


          <div class="name" style={this.state.displayOtherComponents}>
            <h2 >{
              JSON.parse(localStorage.getItem("user")).fullName}</h2>
            <p > {
              JSON.parse(localStorage.getItem("user")).username}</p>
          </div>


       
          <React.Fragment>
            
            <div class="alert" style={this.state.displayError}>
               {this.state.errorMessage}
           </div>
           <div class="form-popup" id="myForm" ref={this.myForm} style={this.state.displayForm} className="centered-form">
                <form ref={this.form} name="form" className="centred-form" onSubmit={this.changePassword} >
                <input value="changePassword" name="event" type="hidden" />
                <input value={JSON.parse(localStorage.getItem("user")).username} name="username" type="hidden" />
                    <h1>Change Password</h1>
                    <div className="field">
                        <label className="field-label" for="oldPassword"></label>
                        <input className="field-input" type="password" placeholder="Enter Old Password" name="oldPassword" required/>
                    </div>
                        <div className="field">
                            <label className="field-label" for="newPassword"></label>
                            <input className="field-input" type="password" placeholder="Enter New Password" name="newPassword" required/>
                    </div>

                            <button type="submit" class="primary-button">Login</button>
                            <button class="secondary-button" type="button" onClick={this.closeForm}>Close</button>
            </form>
            
            </div>
            
            </React.Fragment>

              <div class="more" style={this.state.displayOtherComponents}>
                <button onClick={this.openForm}>Change Password</button>

              </div>
              <div class="more" style={this.state.displayOtherComponents}>
                <form ref={this.form} name="form" className="centred-form" onSubmit={this.logout}>
                  <input value="logout" name="event" type="hidden" />
                  <button>Log Out</button>
                </form>
              </div>
            
          </div>

            <div class="circle1"></div>
            <div class="circle2"></div>
          </React.Fragment>
          )

     }

 }