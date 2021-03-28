 import React from "react"
 import "../css/profile.css";
 export default class AccountPage extends React.Component{
     constructor(props){
         super(props);
     }

     render() {
        return (
            <React.Fragment>
                <div className="card">
         
         
            <div className="p-profile">
             <img src="https://images.unsplash.com/photo-1601412436016-2cde285e3aad?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1000&q=80"></img>
            </div>
            
            
            <div class="name">
              <h2>{
              JSON.parse(localStorage.getItem("user")).fullName}</h2>
              <p> Front-end Developer</p>
            </div>
            xz 
            
            <div class="infos"> 
              <div class="Follower">
                <h4>25k</h4>
                <p>Followers</p>
              </div>
              
              <div class="following">
                <h4>34</h4>
                <p>Following</p>
              </div>
            </div>
            
            <div class="more">
            <button>Change Password</button>
              <button>Visit Profile</button>
            </div>
            
          </div>
          
          <div class="circle1"></div>
          <div class="circle2"></div>
          </React.Fragment>
          )
         
     }
     
 }