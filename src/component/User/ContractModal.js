
import React,{useState, useEffect} from 'react';
import { getDataContractById } from '../Api/User.api';
import HtmlEditor, { Toolbar, Item } from "devextreme-react/html-editor";
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
export default function ContractModal(props) {
    const {id} = props;
    const [listContract, setListContract] = useState([])
    const [listContractName, setListContractName] = useState([])
    const [contentContract, setContentContract] = useState("");


    useEffect(() => {
      if(id !== 0){
        //laays user vs 
        async function getUser(){
            const resq = await getDataContractById(id);
            setListContract(resq.user.userToContract) //set tên ho
            setListContractName(resq.contract) //set danh sach hd của nv đó
            // console.log(resq)
            setContentContract(resq.user.userToContract[0].content)
     
            
        }
    
          getUser()   
      } 
      
    }, [id]);

    const handleOnclickGetContract = (value) => {

      let number = Number(value);
      for(let i = 0; i < listContract.length; i++){
 
          if(listContract[i].contractId === number){
            setContentContract(listContract[i].content)
          }
         
      }
    }

  return(
    <>
      <div className="form-attr">
          {listContract && listContract.length > 0 &&
           <div>
              <select className="custom-select custom-select-lg mb-3" onChange={(val) => handleOnclickGetContract(val.target.value)}>
                
                  {listContract.map((item, index) => {
                    const data = listContractName.filter(it => it.id === item.contractId)
                      return(
                       
                        <option key={index} value={item.contractId}>{data.length === 0 ? "" : data[0].type_of_cotract}</option>
                      )
                   })
                  
                  }
               
              </select>


              
            </div>

         }
              
      </div> 
            <div className="widget-container">
                    <HtmlEditor
                    height={500}
                    value={contentContract}
                    
                
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
    </>
  

  );
}
