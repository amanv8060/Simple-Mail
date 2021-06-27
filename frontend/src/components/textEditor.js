import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import React, { useEffect, useState } from "react";
import './textEditor.css';

export default function Temp() {
  const [convertedText, setConvertedText] = useState("");
  const [interval, setInterval] = useState({ minutes: 0, seconds: 0, hours: 0, days: 0 });



  function onchangeInterval(e) {

    console.log("beofre" , interval)
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
    console.log("after" , interval)
  }

  return (
    <div>
      <div style={{ backgroundColor: "#EDEDED", width: "100%" }}>
        <input type="text" id="fname" placeholder="To:" name="fname" />
        <input type="text" id="fname" placeholder="Subject:" name="fname1" />
        <input type="text" id="fname" placeholder="CC:" name="fname1" />
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
  );
}