import React, { Component } from "react";
import { Menu, Segment } from "semantic-ui-react";
import Modal from "./modal";
import axios from 'axios';

export default class MenuExamplePointing extends Component {
  state = { activeItem: "Scheduled Emails" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  logout = () => {

    localStorage.setItem('jwt', null)
    window.open("/", "_self")
  }
  constructor(props) {
    super(props);
    this.state = { show: false }
    this.state = {
      items: [],
    };
    
    axios.get('https://simplemailbackend.herokuapp.com/api/v1/token/verify', {
      headers: {
        "x-access-token": localStorage.getItem('jwt')
      }
    }).then(resp => {
      console.log(resp);
    }).catch(er => {
      window.open("/", "_self");
    });
  
  }
  moduleHandler = () => {
    this.setState({ show: true });
  }
  componentDidMount() {  this.ExpiredMails()}
  ExpiredMails = () => {
    fetch(`https://simplemailbackend.herokuapp.com/api/v1/mails/getsent`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem('jwt')
      }
    }).then((res) => res.json())
    .then((data) => {console.log(data) 
      this.setState({
      items: data.sentemails.map(item => ({
             subject: item.email.subject,
             sentTime: item.sentTime
    }))
    })})
  }
  render() {
    const { activeItem } = this.state;
    if (localStorage.getItem('jwt') === undefined || localStorage.getItem('jwt') === null)
      return <p>You are not logged in , redirecting to login page</p>
    return (
      <div>
        <div style={{ backgroundColor: "#39A2DB", position: "relative", bottom: "80px", height: "70px", width: "92rem" }}>
          <p style={{ color: "#fff", textAlign: "left", fontSize: "27px", fontWeight: "bold", position: "relative", top: "19px", left: "20px" }}>SimpleMail</p>
          <button style={{ position: "relative", right: "10px", top: "-45px" }} onClick={this.logout} class="ui right floated negative basic button"> Logout</button>
        </div>
        <div style={{ position: "relative", left: "40px", top: "-50px" }}>
          <Menu pointing>
            <Menu.Item
              name=" Scheduled Emails"
              active={activeItem === "Scheduled Emails"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Expired Emails"
              active={activeItem === "Expired Emails"}
              onClick={this.handleItemClick}
            />

          </Menu>

          <div>
            <Modal />
          </div>
        </div>
        {(activeItem === "Expired Emails") ?
          (<div style={{ width: "85.3rem", position: "relative", left: "40px", top: "-40px" }}>

            <Segment>
              <table class="ui celled striped table">
                <thead>
                  <tr>
                    <th colspan="3">All Emails</th>
                  </tr>
                </thead>
                <tbody>
                {console.log(this.state.items)}
               {this.state.items.map(item => {
                 <tr>
                 <td class="collapsing">
                   <i class="calendar icon"></i>JOB 1
                 </td>
                 <td> gdjngj</td>
               
               </tr>
               })}
                  <tr>
                    <td class="collapsing">
                      <i class="calendar icon"></i>JOB 1
                    </td>
                    <td>Subject of Mail</td>
                  
                  </tr>
                  <tr>
                    <td class="collapsing">
                      <i class="calendar icon"></i>JOB 1
                    </td>
                    <td>Subject of Mail</td>
                  
                  </tr>
                  <tr>
                    <td class="collapsing">
                      <i class="calendar icon"></i>JOB 1
                    </td>
                    <td>Subject of Mail</td>
                  
                  </tr>
                  <tr>
                    <td class="collapsing">
                      <i class="calendar icon"></i>JOB 1
                    </td>
                    <td>Subject of Mail</td>
                  
                  </tr>
                  <tr>
                    <td class="collapsing">
                      <i class="calendar icon"></i>JOB 1
                    </td>
                    <td>Subject of Mail</td>
                  </tr>
                </tbody>
              </table>
            </Segment>
          </div>)
          : (
            <div style={{ width: "85.3rem", position: "relative", left: "40px", top: "-40px" }}>

              <Segment>
                <table class="ui celled striped table">
                  <thead>
                    <tr>
                      <th colspan="3">All Emails</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="collapsing">
                        <i class="calendar icon"></i>Scheduled
                      </td>
                      <td>Subject of Mail</td>
                      <td class="right aligned collapsing"><i class="edit icon"></i></td>
                    </tr>
                    <tr>
                      <td class="collapsing">
                        <i class="calendar icon"></i>JOB 1
                      </td>
                      <td>Subject of Mail</td>
                      <td class="right aligned collapsing"><i class="edit icon"></i></td>
                    </tr>
                    <tr>
                      <td class="collapsing">
                        <i class="calendar icon"></i>JOB 1
                      </td>
                      <td>Subject of Mail</td>
                      <td class="right aligned collapsing"><i class="edit icon"></i></td>
                    </tr>
                    <tr>
                      <td class="collapsing">
                        <i class="calendar icon"></i>JOB 1
                      </td>
                      <td>Subject of Mail</td>
                      <td class="right aligned collapsing"><i class="edit icon"></i></td>
                    </tr>
                    <tr>
                      <td class="collapsing">
                        <i class="calendar icon"></i>JOB 1
                      </td>
                      <td>Subject of Mail</td>
                      <td class="right aligned collapsing"><i class="edit icon"></i></td>
                    </tr>
                  </tbody>
                </table>
              </Segment>
            </div>
          )}

      </div>
    );
  }

}