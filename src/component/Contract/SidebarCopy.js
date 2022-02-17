import React, { useState, useEffect } from "react";

import HtmlEditor, { Toolbar, Item } from "devextreme-react/html-editor";

import './sidebar.css'
import { getColumnUser, getInfoUser } from "../Api/User.api";
import {  getColumAttrAndColumnUser } from "../Api/Contract.api";


 const  SidebarCopy = React.forwardRef((props, ref) => {
    const {htmlEditor, listUser} = props;
    const [attributes, setAttribute] = useState([]);



    //get danh sách column
    useEffect(() => {  
      async function getColumn(){
          //danh sách column
          const columUserAndAttr = await getColumAttrAndColumnUser()
          setAttribute(columUserAndAttr.data)
      }

      getColumn()
    }, []);




    const onTest = (item) => {
        item = `{{${item}}}`;
        props.getListOption(item);
        htmlEditor.current.instance.insertText(
            htmlEditor.current.instance.getSelection().index,item
        );
      };




  

  return (
    <div>


        <HtmlEditor ref={htmlEditor}>
          <Toolbar>
          <Item><ul className="list-group">{attributes && attributes.length > 0 &&
              attributes.map(function(item,index) {
                if(item !== "id" && item !== "password"){
                  return(
                    <li className="list-group-item" onClick={()=>onTest(item)} key={item}  className="list-group-item">{item}  </li>
                  )                  
                }
     
            })
            }</ul></Item>

          </Toolbar>
          
        </HtmlEditor>

       


    </div>
  );
});

export default SidebarCopy;