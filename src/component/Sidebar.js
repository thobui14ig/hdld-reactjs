import React, { useState, useEffect } from "react";

import HtmlEditor, { Toolbar, Item } from "devextreme-react/html-editor";

import './sidebar.css'


 const  Sidebar = React.forwardRef((props, ref) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");


    const {htmlEditor} = props;

   

    const attribute = [
        {id: 1, lable: "Ho_va_ten", entity_id: 1},
        {id: 2, lable: "Email", entity_id: 1},
        {id: 3, lable: "Phone", entity_id: 1},

    ]

    const onTest = (item) => {
        item = `{{${item}}}`;

        props.getListOption(item);
        htmlEditor.current.instance.insertText(
            htmlEditor.current.instance.getSelection().index,item
        );
      };

    const handleChangeName = (e) => {
        setName(e.target.value)
    }
    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleChangePhone = (e) => {
        setPhone(e.target.value)
    }
    

    const handleOnlick = () => {
        props.getResult(name, email, phone)
    }

  return (
    <div style={{display: 'flex'}}>
        <HtmlEditor ref={htmlEditor}
          height={1000}
        >
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
            <input type="text"  onChange={(e)=> handleChangeName(e)}  value={name} />
            <input type="text"  onChange={(e)=> handleChangeEmail(e)}  value={email} />
            <input type="text"  onChange={(e)=> handleChangePhone(e)}  value={phone} />
            <button  onClick={() => handleOnlick()}>ok</button>
          

        </div>
       


    </div>
  );
});

export default Sidebar;