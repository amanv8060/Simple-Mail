import React, { Component } from "react";
import { Menu, Segment } from "semantic-ui-react";
import Modal from "./modal";
import axios from 'axios';
import EditModal from "./EditModal";
var moment = require('moment');

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
      it: [],
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
  componentDidMount() {
    this.ExpiredMails()
    this.ScheduledEmails()
  }
  ExpiredMails = () => {
    fetch(`https://simplemailbackend.herokuapp.com/api/v1/mails/getsent`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem('jwt')
      }
    }).then((res) => {
      if (res.status === 200) {
        res.json().then(data => {

          console.log(data)
          this.setState({
            items: data.sentemails.map(item => ({
              subject: item.email.subject,
              sentTime: item.sentTime
            }))
          })
        })

      }
    })

  }
  ScheduledEmails = () => {
    fetch(`https://simplemailbackend.herokuapp.com/api/v1/auth/user/getdata`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem('jwt')
      }
    }).then((res) => {
      if (res.status === 200) {
        res.json().then(data => {

          console.log(data)
          this.setState({
            it: data.scheduledemails.map(item => ({
              email: item.email,
              jobid: item.jobid,
              interval: item.interval
            }))
          })
        })

      }
    })

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

                  {this.state.items.map(item => {
                    return [<tr>
                      <td class="collapsing">
                        {moment(item.sentTime).fromNow()}
                      </td>
                      <td> {item.subject}
                      </td>

                    </tr>]
                  })}
                </tbody>
              </table>
            </Segment>
          </div>)
          : (
            (<div style={{ width: "85.3rem", position: "relative", left: "40px", top: "-40px" }}>

              <Segment>
                <table class="ui celled striped table">
                  <thead>
                    <tr>
                      <th colspan="3">All Emails</th>
                    </tr>
                  </thead>
                  <tbody>

                    {this.state.it.map(item => {
                      return [<tr>
                        <td class="collapsing">
                          <i class="calendar icon"></i>{`${item.interval.days} days ,${item.interval.hours} hrs , ${item.interval.minutes} mins, ${item.interval.seconds} secs `}
                        </td>
                        <td>{item.email.subject}</td>
                        <td class="right aligned collapsing"><i class="edit icon"></i></td>
                      </tr>]
                    })}
                  </tbody>
                </table>
              </Segment>
            </div>)


          )}

      </div>
    );
  }

}