import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import React, { useEffect, useState } from "react";

export default function Temp() {
  const [convertedText, setConvertedText] = useState("");
  return (
    <div>
        <div style={{backgroundColor:"#EDEDED",width:"100%"}}>
        <input type="text" id="fname"  placeholder="To:"name="fname"/>
        <input type="text" id="fname"  placeholder="Subject:"name="fname1"/>
        <input type="text" id="fname"  placeholder="CC:"name="fname1"/>
      <ReactQuill
        theme='snow'
        value={convertedText}
        onChange={setConvertedText}
        style={{minHeight: '300px'}}
      />
    </div>
    </div>
  );
}