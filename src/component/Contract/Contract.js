import React, { useState, useRef, useEffect } from "react";

import HtmlEditor, { Toolbar, Item } from "devextreme-react/html-editor";

// import Content from './component/Content'

import Sidebar from "./Sidebar";
import "devextreme/ui/html_editor/converters/markdown";
import { markup } from "../../data";

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

  const [editorValueType, setEditorValueType] = useState("html");

  function valueChanged(e) {
    setValueContent(e.value);
  }

  // const valueTypeChanged = (e) => {
  //   setEditorValueType(e.addedItems[0].text.toLowerCase());
  // };

  const getResult = (obj) => {
    // console.log(obj)

    let ContentCopy = valueContent;
    for(let i = 0; i < listOption.length; i++){
      let value = listOption[i].replace("{{", "");
      value = value.replace("}}", "");

      // console.log(value)
      ContentCopy = ContentCopy.replace(listOption[i], obj[value])
    }
    // listOption.map(item => (
    //   // console.log(item)
      
    // ))
    setResult(ContentCopy)

  }


  const getListOption = (Option) => {
    const listOptionCopy = listOption;
    setListOption([...listOptionCopy, Option])
  }

  

  return (
    <>
      <div className="side-bar">
        <Sidebar 
          htmlEditor={htmlEditor}
          getResult={getResult}
          getListOption={getListOption}
        />
      </div>
      
      <div className="widget-container">
        <HtmlEditor ref={htmlEditor}
          height={500}
          value={valueContent}
          valueType={editorValueType}
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