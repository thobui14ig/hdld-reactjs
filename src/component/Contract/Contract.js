import React, { useState, useRef, useEffect } from "react";

import HtmlEditor, { Toolbar, Item } from "devextreme-react/html-editor";

// import Content from './component/Content'

import Sidebar from "./Sidebar";
import "devextreme/ui/html_editor/converters/markdown";
import { markup } from "../../data";
import { getAllUser } from "../Api/User.api";

const sizeValues = ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "360pt"];
const fontValues = [
  "Arial",
  "Courier New",
  "Georgia",
  "Impact",
  "Lucida Console",
  "Tahoma",
  "Times New Roman",
  "Verdana",
];


export default function Contract() {
  const htmlEditor = useRef(null);
  const [valueContent, setValueContent] = useState(markup);
  const [result, setResult] = useState('')
  const [listOption, setListOption] = useState([]); //ds dc chọn
  const [listUser, setListUser] = useState([])

  //lấy danh sách nhân viên
  useEffect(() => {
    //lấy danh sách úser
    async function fetchAll(){
        const resq = await getAllUser();
        setListUser(resq)
    }

    fetchAll()

  }, [])
  console.log(listUser)
  //thay đổi valueContent
  function valueChanged(e) {
    setValueContent(e.value);
  }


  const getResult = (obj) => {
    // console.log(obj)

    let ContentCopy = valueContent;
    for(let i = 0; i < listOption.length; i++){
      let value = listOption[i].replace("{{", "");
      value = value.replace("}}", "");

      console.log(value)
      ContentCopy = ContentCopy.replace(listOption[i], obj[value])
    }
    setResult(ContentCopy)

  }


  const getListOption = (Option) => {
    const listOptionCopy = listOption;
    setListOption([...listOptionCopy, Option])
  }

  console.log(result)

  return (
    <>
      <div className="side-bar">
        <Sidebar 
          htmlEditor={htmlEditor}
          getResult={getResult}
          getListOption={getListOption}
          listUser={listUser}
        />
      </div>
      
      <div className="widget-container">
        <HtmlEditor ref={htmlEditor}
          height={500}
          value={valueContent}
          onValueChanged={valueChanged}
        >
          <Toolbar>
            <Item name="undo" />
            <Item name="redo" />
            <Item name="separator" />
            <Item name="size" acceptedValues={sizeValues} />
            <Item name="font" acceptedValues={fontValues} />
            <Item name="separator" />
            <Item name="bold" />
            <Item name="italic" />
            <Item name="strike" />
            <Item name="underline" />
            <Item name="separator" />
            <Item name="alignLeft" />
            <Item name="alignCenter" />
            <Item name="alignRight" />
            <Item name="alignJustify" />
            <Item name="separator" />
            <Item name="color" />
            <Item name="background" />
          </Toolbar>
        </HtmlEditor>


      </div> 
      <HtmlEditor  value={result === "" ? valueContent : result}></HtmlEditor>   
    </>

  );
}