import React, { Component } from "react";
import {  Menu, Segment } from "semantic-ui-react";
export default class MenuExamplePointing extends Component {
  state = { activeItem: "Scheduled Emails" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <div style={{ backgroundColor: "#39A2DB" ,position:"relative",bottom:"80px",height:"70px",width:"92rem"}}>
          <p style={{ color: "#fff", textAlign: "left" ,fontSize:"27px",fontWeight:"bold",position:"relative",top:"19px",left:"20px"}}>SimpleMail</p>
          <button style={{position:"relative",right:"10px",top:"-45px"}}class="ui right floated negative basic button"> Logout</button>
        </div>
        <div style={{position:"relative",left:"40px",top:"-50px"}}>
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
        <div> <button style={{position:"relative",right:"120px",top:"-72px"}}class="ui right floated secondary basic button">
        <h3  style={{textAlign:"center",cursor:"pointer"}}>Create <i class="plus icon"></i></h3>
          </button> </div>      
</div><div style={{width:"85.3rem",position:"relative",left:"40px",top:"-40px"}}>
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
      </div>
    );
  }
}
