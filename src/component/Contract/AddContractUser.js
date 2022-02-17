import { HtmlEditor } from 'devextreme-react';
import { Item } from 'devextreme-react/accordion';
import { Toolbar } from 'devextreme-react/data-grid';
import React, {useEffect, useState, useRef} from 'react';
import { useParams, withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { editContract, getContract, getContractById, getColumAttrAndColumnUser } from '../Api/Contract.api';
import SidebarCopy from "./SidebarCopy";
import {getAllUser, getUserAndAttr} from '../Api/User.api'
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
    let { id, idUser } = useParams();

    const [editorValueType, setEditorValueType] = useState("html");
    const [contract, setContract] = useState([])
    const [contentContract, setContentContract] = useState("");


    
    useEffect(() => {        
        async function run(){
            //danh sách loại hợp đồng
            const resq = await getContract();
            setContract(resq)


            //lấy data của attr và user (slug_name)
            const dataContract = await getContractById(id);
            let content_contract = dataContract.content_contract;
            //lấy column name
            const colum = await getColumAttrAndColumnUser();
            //lấy thông tin user
            let user = await getUserAndAttr(idUser);
            user = user.user;

          
           

            //gắng lại các attr cho dễ làm việc
             for(let i = 0; i < user.values.length; i++){
                 user[user.values[i].attr.slug_name] = user.values[i].value;
             }


             //nối mảng attr dderr lọc
             const newColumn = colum.columUser.concat(colum.columAttr);

             let contentContractCopy = content_contract;
            for(let i = 0; i <= newColumn.length; i++){
              if(newColumn[i]){
                  let value = newColumn[i].replace("{{", "");
                  value = value.replace("}}", "");


                  contentContractCopy = contentContractCopy.replace(`${newColumn[i]}`, user[value] ? user[value] : "")
                  if(newColumn[i] == "{{address}}"){
                    contentContractCopy = contentContractCopy.replace("{{address}}", user[value])
                  }
              }
            }

            setContentContract(contentContractCopy)

        }
        run()


    }, [id]);

    
    const handleOnclickChooseContract = (id) => {
        props.history.push(`/contract/AddContractUser/${idUser}/${id}`)
    }





    function valueChanged(value) {
        setContentContract(value);
    } 

    // console.log(contentContract)

    
    // const handleOnclickSaveContract = () => {
    //     editContract(id, contentContract, "http://localhost:8000/contract/edit/")
    // }




    return(
        <>

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
        </>

      
  

    );
}
export default withRouter(EditContract) 