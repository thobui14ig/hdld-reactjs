import { HtmlEditor } from 'devextreme-react';
import { Item } from 'devextreme-react/accordion';
import { Toolbar } from 'devextreme-react/data-grid';
import React, {useEffect, useState, useRef} from 'react';
import { useParams, withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { editContract, getContract, getContractById } from '../Api/Contract.api';
import SidebarCopy from "./SidebarCopy";
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
const EditContract = (props) => {
    const htmlEditor = useRef(null);
    let { id } = useParams();
    const [editorValueType, setEditorValueType] = useState("html");
    const [contract, setContract] = useState([])
    const [contentContract, setContentContract] = useState("");
    const [listOption, setListOption] = useState([]); //ds dc chọn

    
    useEffect(() => {
        //danh sách loại hợp đồng
        console.log("<<đọc nd")
        async function getListContract(){
            const resq = await getContract();
            setContract(resq)
        }
         getListContract()
        //khi load vào đầu tiên
        getDB(id)  


    }, [id]);

    
    const handleOnclickChooseContract = (id) => {
        props.history.push(`/editContract/${id}`)
    }



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
    } 

    
    const handleOnclickSaveContract = () => {
        editContract(id, contentContract, "http://localhost:8000/contract/edit/")
    }


    const getListOption = (Option) => {
        const listOptionCopy = listOption;
        setListOption([...listOptionCopy, Option])
    }

    return(
        <>
            <div className="side-bar">
                <SidebarCopy
                  htmlEditor={htmlEditor}
                  getListOption={getListOption}

                />
            </div>
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
                        <HtmlEditor ref={htmlEditor}
                        height={500}
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
                <button className="btn-save" onClick={() => handleOnclickSaveContract()}>Lưu</button>
            </div>
        </>

      
  

    );
}
export default withRouter(EditContract) 