import React, { useState, useEffect } from "react";

import HtmlEditor, { Toolbar, Item } from "devextreme-react/html-editor";

import './sidebar.css'
import { getColumnUser, getInfoUser } from "../Api/User.api";


 const  Sidebar = React.forwardRef((props, ref) => {
    const {htmlEditor, listUser} = props;
    const [attributes, setAttribute] = useState([]);
    const [userInfo, setUserInfo] = useState({})


    //get danh sách column
    useEffect(() => {  
      async function getColumn(){
          const resq = await getColumnUser();
          setAttribute(resq)
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

    const handleOnlick = () => {
      console.log(Object.keys(userInfo).length)
      if(Object.keys(userInfo).length == 0){
        alert("XIN CHỌN NHÂN VIÊN")
      }else{
        props.getResult(userInfo)
      }
        
    }

    const handleGetValueUser = (id) => {
      async function getUser(){
          const resq = await getInfoUser(id);
          // setContract(resq)
          setUserInfo(resq)
      }

      getUser()
    }

    console.log(userInfo)

  return (
    <div>
      <label>Chọn nhân viên:</label>
        <select className="form-select option-listContract" onChange={(val) => handleGetValueUser(val.target.value)}>
          <option value="0">Chọn nhân viên</option>
          {listUser && listUser.length > 0 &&
            listUser.map(item => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))
            
          }
         
        </select>
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
        <div>
            <button style={{background: "aqua"}} disabled={Object.keys(userInfo).length === 0 ? "disabled" : ""} onClick={() => handleOnlick()}>loadding</button>
        </div>
       


    </div>
  );
});

export default Sidebar;