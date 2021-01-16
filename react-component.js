function mainButton(){
    return <button class="main-button"></button>;
}
function secondaryButton(){
    return (<button class="secondary-button"></button>);
}
class LoginForm extends  React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return(<form>
            <label for="username">username</label>
         <input type="text" name="username" id="username"/>
         <mainButton></mainButton>
         
        </form>);
    }
}
class RegisterForm extends React.Component{
    constructor(props){
        super(props);
    }
    render (){
        return (<form>
                <label for="username">register</label>
         <input type="text" name="username" id="username"/> 
         </form>);
    }
}
const container=document.getElementById("login-register-container");

function displayLogin(){
    console.log("hi");
ReactDOM.render(LoginForm,container);
}
document.getElementById ("login").addEventListener ("click", displayLogin, false);