import { HtmlEditor } from 'devextreme-react';
import { Item } from 'devextreme-react/accordion';
import { Toolbar } from 'devextreme-react/data-grid';
import React, {useEffect, useState} from 'react';
import { useParams, withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { getContract, getContractById } from '../Api/Contract.api';
import './sidebar.css'
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
const EditContract = () => {
    // let { id } = useParams();
    const [editorValueType, setEditorValueType] = useState("html");
    const [contract, setContract] = useState([])
    const [contentContract, setContentContract] = useState("<div></div>");

    
    // const valueChanged = (e) => {
    //     setContentContract(e.value)
    // }


    useEffect(() => {
        //danh sách loại hợp đồng
        console.log("<<đọc nd")
        async function getListContract(){
            const resq = await getContract();
            setContract(resq)
        }
         getListContract()
        //khi load vào đầu tiên
        getDB(1)  

    }, []);

    
    const handleOnclickChooseContract = (id) => {
        getDB(id)
    }

    console.log(contentContract)

    //lấy nội dung của hợp đồng
    const getDB = (id) => {
        async function getContent(){
            const resq = await getContractById(id);
            // setContract(resq)
            setContentContract(resq.content_contract)
        }

        getContent()
    }

    function valueChanged(value) {
        setContentContract(value);
       console.log(value,'nè huhu')
      } 


    return(
        <div className="contract">
            <h5>Loại hợp đồng:</h5>
            <select className="form-select option-listContract" onChange={(val) => handleOnclickChooseContract(val.target.value)}>
                {contract && contract.length > 0 &&
                    contract.map(item => (
                        <option key={item.id} value={item.id}>{item.type_of_cotract}</option>
                    ))
                }
                
       
            </select>  
      <div className="widget-container">
            <HtmlEditor
            height={500}
       //   defaultValue={contentContract}
         value={contentContract}
            valueType={editorValueType}
    onValueChange={valueChanged}
           
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
        </div>
      
  

    );
}
export default withRouter(EditContract) 