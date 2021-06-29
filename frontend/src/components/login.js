import { React, useState } from 'react'
import './login.css'

import GoogleLogin from 'react-google-login';
import axios from 'axios';

const Login = () => {
  const [Name, setName] = useState("");
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailIdEmpty, setIsEmailIdEmpty] = useState(false);
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  function NameChange(e) {
    setName(e.target.value);
  }
  function emailIDChange(e) {
    setEmailID(e.target.value);
  }
  function passwordChange(e) {
    setPassword(e.target.value);
  }
  function OnSubmit() {
    if (Name === "") {
      setIsNameEmpty(true);
    }
    if (Name) {
      setIsNameEmpty(false);
    }
    if (emailID === "") {
      setIsEmailIdEmpty(true);
    }
    if (emailID) {
      setIsEmailIdEmpty(false);
    }
    if (password === "") {
      setIsPasswordEmpty(true);
    }
    if (password) {
      setIsPasswordEmpty(false);
    }
    if (Name && emailID && password) {
      fetch(`https://simplemailbackend.herokuapp.com/api/v1/auth/user/signup`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: Name,
          email: emailID,
          password: password,
        }),
      })
        .then((response) => response.json())
      alert("Account Successfully Created Signin To Continue")
    }

  }

  const responseSuccessGoogle = (response) => {
    axios({
      method: "PUT",
      url: "https://simplemailbackend.herokuapp.com/api/v1/auth/user/googlelogin",
      data: { tokenId: response.tokenId }
    }).then(resp => {
      localStorage.setItem('jwt', resp.data.token)
      window.open('/home', '_self');
    });
  }


  const responseFailureGoogle = (response) => {
    console.log(response);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (emailID === "") {
      setIsEmailIdEmpty(true);
    }
    if (emailID) {
      setIsEmailIdEmpty(false);
    }
    if (password === "") {
      setIsPasswordEmpty(true);
    }
    if (password) {
      setIsPasswordEmpty(false);
    }
    if (emailID && password) {
      fetch(`https://simplemailbackend.herokuapp.com/api/v1/auth/user/signin`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailID,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("jwt", data.token);
          if (data.email) {
            window.open("/home", "_self");
          }
          else {
            alert("Fill Up Correct Information")
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }
  const afterClick = () => {
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
              <input type="text" placeholder="Name" value={Name} onChange={NameChange} />
              <input type="email" placeholder="Email" value={emailID}
                onChange={emailIDChange} />
              <input type="password" placeholder="Password" value={password} onChange={passwordChange} />
              <button onClick={OnSubmit}> Sign Up</button>
              <GoogleLogin
                clientId="341066356281-f7gltndskdv4o9jei7g6eu52ggjm99uc.apps.googleusercontent.com"
                buttonText="SignUp with Google"
                onSuccess={responseSuccessGoogle}
                onFailure={responseFailureGoogle}
                cookiePolicy={'single_host_origin'}
              />
            </form>

          </div>
          <div className="form-container sign-in-container">
            <form action="#" onSubmit={handleSubmit}>
              <h1>Sign in</h1>

              <input type="email" placeholder="Email" value={emailID}
                onChange={emailIDChange} />
              <input type="password" placeholder="Password" value={password} onChange={passwordChange} />
              <button >Sign In</button>
              <GoogleLogin
                clientId="341066356281-f7gltndskdv4o9jei7g6eu52ggjm99uc.apps.googleusercontent.com"
                buttonText="SignIn with Google"
                onSuccess={responseSuccessGoogle}
                onFailure={responseFailureGoogle}
                cookiePolicy={'single_host_origin'}
              />
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  Find ease in scheduleing emails
                </p>
                <button onClick={afterClick} className="ghost" style={{ marginTop: "10px" }} id="signIn">
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>SimpleMail</h1>
                <p>Helps in reseduling mails </p>
                <button onClick={afterClick} className="ghost" id="signUp">
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
