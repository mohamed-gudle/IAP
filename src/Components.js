import React from 'react'

export default function SecondaryButton(props) {
    return (
       <button class="secondary-button" onClick={props.onClick}> {props.text}</button>
    )
}
export class LoginForm extends React.Component{
constructor(props){
    super(props);

}
render() {
    return (
        <div>
            <form>
               <label for="Email">Email</label>
               <input type="email" required="true" promptText="Email"/>
               <label for="Password">Password</label>
               <input type="password" required="true"/>
               <button type="submit">Login</button>
            </form>
        </div>
    )
}
}
