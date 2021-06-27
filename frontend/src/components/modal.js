import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from "react";
import './textEditor.css';
function ModalExampleModal() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [cc, setCc] = useState("");
  const [body, setBody] = useState("");
  const [from, setFrom] = useState("");
  const [convertedText, setConvertedText] = useState("");
  const [open, setOpen] = React.useState(false)
  const [interval, setInterval] = useState({ minutes: 0, seconds: 0, hours: 0, days: 0 });
  function onchangeInterval(e) {

    switch (e.target.id) {
      case "intervaldays": setInterval({
        minutes: interval.minutes, seconds: interval.seconds, hours: interval.hours, days: e.target.value
      })
        break;
      case "intervalhrs": {
        setInterval({
          minutes: interval.minutes, seconds: interval.seconds, hours: e.target.value, days: interval.days
        })
        break;
      }
      case "intervalminutes": setInterval({
        minutes: e.target.value, seconds: interval.seconds, hours: interval.hours, days: interval.days
      })
        break;
      case "intervalseconds": setInterval({
        minutes: interval.minutes, seconds: e.target.value, hours: interval.hours, days: interval.days
      })
        break;
      default:
    }
  }
  function FromChange(e) {
    setFrom(e.target.value);
  }
  function ToChange(e) {
    setTo(e.target.value);
  }
  function subjectChange(e) {
    setSubject(e.target.value);
  }
  function ccChange(e) {
    setCc(e.target.value);
  }
  function OnSubmit() {
    if (to && convertedText && subject) {
    fetch(`https://simplemailbackend.herokuapp.com/api/v1/mails/create`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem('jwt')
        },
        body: JSON.stringify({
          name: "Admin",
          to: to,
          subject: subject,
          body: convertedText,
          interval: interval,
          cc: ["yashvimahapatra201@gmail.com"]
        }),
      })
        .then((response) => {
          if (response.status == 200) {
            response.json().then((data) => {
              setOpen(false)
            });
          }
          else {
            alert("Error Occurred")
            console.log(response)
          }
        }).catch((er)=>{console.log(er)}) 
    }
    else{
      alert("Fill all the fields");
    }
  }


  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button style={{ position: "relative", right: "120px", top: "-72px" }} className="ui right floated secondary basic button">
        <h3 style={{ textAlign: "center", cursor: "pointer" }}>Create <i class="plus icon"></i></h3>
      </Button>}
    >
      <Modal.Header> Schedule Mail</Modal.Header>
      <Modal.Content>
        <div>
          <div style={{ backgroundColor: "#EDEDED", width: "100%" }}>

            <input type="text" id="fname" placeholder="To:" name="fname" value={to} onChange={ToChange} />
            <input type="text" id="fname" placeholder="Subject:" name="fname1" value={subject} onChange={subjectChange} />
            <input type="text" id="fname" placeholder="CC:" name="fname2" />
            <table className="interval">
              <tbody>
                <tr>
                  <td>
                    <input type="number" id="intervaldays" className="intervalInput" placeholder="Days" name="fname1" onChange={onchangeInterval} />
                    <input type="number" id="intervalhrs" className="intervalInput" placeholder="Hours" name="fname1" onChange={onchangeInterval} />
                    <input type="number" id="intervalminutes" className="intervalInput" placeholder="Minutes" name="fname1" onChange={onchangeInterval} />
                    <input type="number" id="intervalseconds" className="intervalInput" placeholder="Seconds" name="fname1" onChange={onchangeInterval} />
                  </td>
                </tr>
              </tbody>
            </table>


            <ReactQuill
              theme='snow'
              value={convertedText}
              onChange={setConvertedText}
              style={{ minHeight: '300px' }}
            />
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions >
        <Button color='black' onClick={() => setOpen(false)}>
          Cancel
        </Button>

        <Button style={{ backgroundColor: "#39A2DB", color: "#fff" }} onClick={OnSubmit}>
          Send
        </Button>

      </Modal.Actions>
    </Modal>
  )
}

export default ModalExampleModal
