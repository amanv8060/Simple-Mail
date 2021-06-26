import React from 'react'
import './login.css'
const Login = () => {
  const afterClick = () =>{
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
      signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
      });
    });
  }

    return (
        <>
       <div>
    <div className="container" id="container">
      <div className="form-container sign-up-container">
        <form action="#">
          <h1>Create Account</h1>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form action="#">
          <h1>Sign in</h1>
        
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
             Find ease in scheduleing emails
            </p>
            <button onClick={afterClick} className="ghost" style={{marginTop:"10px"}} id="signIn">
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>SimpleMail</h1>
            <p>Helps in reseduling mails bla bla bla</p>
            <button onClick={afterClick}className="ghost" id="signUp">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
 
  </div>
        </>
    )
}

export default Login
