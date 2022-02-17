import React, {useState, useEffect} from 'react';
import {
    useQuery,useMutation,
    gql,
    useLazyQuery
  } from "@apollo/client";

import { ADD_PET, GET_ALL_PET, GET_PET_BY_ID, DELETE_PET, GET_ALL_OWNER } from '../Graphql/Graphql-data';
import Modal from 'react-awesome-modal';
import EditPet from './EditPet';

const Pet = () => {
    const getAllPet = useQuery(GET_ALL_PET); // lấy danh sách súc vật
    const getAllOwner = useQuery(GET_ALL_OWNER); // lấy danh sách owner
console.log(getAllOwner)
    // console.log(getAllPet.data)

    const [ addPet ] = useMutation(ADD_PET); // thêm súc vật
    const [ getSinglePet, { data } ] = useLazyQuery(GET_PET_BY_ID); // lấy 1 súc vấtj
    const [ deletePet ] = useMutation(DELETE_PET); // xóa súc vật


    //state
    const [visibleInfoUser ,setVisibleEditPet ]= useState(false)
    const [petName, setPetName] = useState("");
    const [petId, setPetId] = useState(0)
    const [ownerId, setOwnerId] = useState(null)
    const [singlePetInfo, setSinglePetInfo] = useState(null)



    const handleOnChangePetName = (e) => {
        setPetName(e.target.value)
    }

    const handleOnchaneOwnerId = (e) => {
        // alert(e.target.value)
        setOwnerId(e.target.value)
    }
    const handleOnclickAddPet = () => {
        console.log(petName, ownerId)
        addPet({
             variables: { 
                 "input": {name: petName, ownerId: +ownerId , type: "cccc"},
                 
             },
             refetchQueries: [{query: GET_ALL_PET}] //load lại data
        });
        
      
    }

    //lấy 1 pet 
    const handleOnclickDeTail = (id) => {
        getSinglePet({ 
            variables: { id: id },
     });
   
    }
    useEffect(() => {
        
        setSinglePetInfo(data)
    }, [data]);

    //delete
    const hanhdleDelete = (id) => {
        deletePet({
            variables: { id: id },
            refetchQueries: [{query: GET_ALL_PET}] //load lại data
        })
    }

    //show modal info user
    const openModal = (id) =>{
        
        setVisibleEditPet(true)
        setPetId(id)
    } 
    const closeModal = () => {
        setVisibleEditPet(false)
        setPetId(0)
    }
    console.log(petId)
    return(
        <>
            <div className="add-attr">
                <label>Tên: </label>
                <input type="text" onChange={(e) => handleOnChangePetName(e)} />
               

                <span>Chủ nhân:</span>
                <select className="form-select" aria-label="Default select example" onChange={(e) => handleOnchaneOwnerId(e)}>
                    <option >Chọn</option>
                    {getAllOwner.data && getAllOwner.data["owners"].length > 0 &&
                        getAllOwner.data["owners"].map((item, index) =>{
                            return(
                                <option value={item.id} key={index}>{item.name}</option>
                            )
                        })
                        
                    }
                    
                   
                
                </select>

                <button type="button" className="btn btn-primary btn-add-attr" onClick={() => handleOnclickAddPet()} >Add</button>
                
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Name</th>
                        <th scope="col">Chủ nhân</th>

                    </tr>
                </thead>
                <tbody>
                    {getAllPet.data && getAllPet.data["pets"].length > 0 &&
                        getAllPet.data["pets"].map((item, index) =>{
        
                            return(
                                <tr key={index} >
                                    <th scope="row">{item.id}</th>
                                    <td >{item.name}</td>
                                    <td>{item.owner.name}</td>
                                    <td>
                                        <button onClick={() => openModal(item.id)} type="button" className="btn btn-info">Eidt</button>
                                        <button onClick={() => hanhdleDelete(item.id)} type="button" className="btn btn-danger">Delete</button>
                                        <button onClick={() => handleOnclickDeTail(item.id)} type="button" className="btn btn-primary">Chi tiết</button>
                                    </td>
                                </tr>
                            )
                        })

                    }

                </tbody>
            </table>  
            {singlePetInfo &&
                <>
                    <p>id: {singlePetInfo.getPet.id}</p>
                    <p>Tên: {singlePetInfo.getPet.name}</p>
                    <p>Chủ nhân: {singlePetInfo.getPet.owner.name}</p>

            
                </>



            }


                <Modal 
                    visible={visibleInfoUser}
                    width="1000"
                    height="600"
                    onClickAway={() => closeModal()}
                >
                    {petId && petId !== 0 &&
                        <EditPet
                            petId={petId}
                            listOwner={getAllOwner}
                            closeModal={closeModal}
                        />
                    }


                </Modal>

         
        </>

    );
}


export default React.memo(Pet);