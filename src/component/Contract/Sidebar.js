import React, { useState, useEffect } from "react";

import HtmlEditor, { Toolbar, Item } from "devextreme-react/html-editor";

import './sidebar.css'


 const  Sidebar = React.forwardRef((props, ref) => {
    const {htmlEditor} = props;
    const attribute = [
        {id: 1, lable: "ho_va_ten", entity_id: 1},
        {id: 2, lable: "email", entity_id: 1},
        {id: 3, lable: "phone", entity_id: 1},

    ]

    const onTest = (item) => {
        item = `{{${item}}}`;

        props.getListOption(item);
        htmlEditor.current.instance.insertText(
            htmlEditor.current.instance.getSelection().index,item
        );
      };

    const handleOnlick = () => {
        props.getResult({
          "ho_va_ten": "Bùi Thanh Thọ",
          "email": "buithanhtho14ig@gmail.com",
          "phone": "09634662369"
        })
    }

  return (
    <div>
        <HtmlEditor ref={htmlEditor}>
          <Toolbar>
          <Item><ul className="list-group">{
              attribute.map(function(item,index) {
                return(
                    <li className="list-group-item" onClick={()=>onTest(item.lable)} key={item.id}  className="list-group-item">{item.lable}  </li>
                )
            })
            }</ul></Item>

          </Toolbar>
          
        </HtmlEditor>
        <div>
            <button  onClick={() => handleOnlick()}>loadding</button>
        </div>
       


    </div>
  );
});

export default Sidebar;