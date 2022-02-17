import { Modal } from "bootstrap";
import { Button } from "devextreme-react/autocomplete";
import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { addAttr, getAttr } from "../Api/Contract.api";
import './css/Attr.css'


const Attribute = () => {
  const [listAttr, setListAttr] = useState([]);
  const [fieldName, setFieldName] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    async function fetchAll() {
      const resq = await getAttr();

      setListAttr(resq);
    }

    fetchAll();

  }, []);

  const handleOnclickFieldName = async() => {
    //gủi api
    const response = await addAttr(fieldName)
    console.log(response)

      
    setListAttr(listAttr => {
      return [
        ...listAttr,
       {id: response.id, name: response.name, slug_name: response.slug_name}
      ];
    })


  }


  const handleOnchange = (e) => {
    setFieldName(e.target.value)
  }

  return (
    <>
    <div className="attr">
        <div className="add-attr">
            <label>Field name:</label>
            <input type="text" onChange={(e) => handleOnchange(e)}/>
            <button onClick={() => handleOnclickFieldName()} type="button" className="btn btn-primary btn-add-attr" >Add</button>

            
        </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Name</th>
            <th scope="col">Slug_name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listAttr &&
            listAttr.length > 0 &&
            listAttr.map((item) => {
       
              return (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.slug_name}</td>
                  <td>Xóa</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>



    </>
  );
};

export default Attribute;
