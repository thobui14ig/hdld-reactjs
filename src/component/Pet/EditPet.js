import { useQuery, useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react'
import './Pet.css'
import {  GET_PET_BY_ID, UPDATE_PET } from '../Graphql/Graphql-data';

const EditPet = (props) => {
    const [dataPet, setDataPet] = useState(null);
    const [pet, setPet] = useState({
        petName: "",
        ownerId: ""
    });



    const [ updatePet ] = useMutation(UPDATE_PET); // update súc vật
    const { loading, error, data } = useQuery(GET_PET_BY_ID, {
        variables: { id: props.petId },
    });  
    
    useEffect(() => {
        if(data !== undefined){
            setDataPet(data)
        }
        
    }, [data]);


    // console.log(data)
    const handleOnchangePet = (e) => {
        
        const updatePetName = {
            ...pet,
            petName: e.target.value
        }
        setPet(updatePetName)

    }

    const handleOnchaneOwnerId = (e) => {
        const updateOwnerId = {
            ...pet,
            ownerId: e.target.value
        }
        setPet(updateOwnerId)
    }
    const handleSaveEditPet = () => {
        const a = pet.petName === "" ? data.getPet.name : pet.petName;
        const b = pet.ownerId === "" ? data.getPet.owner.id : pet.ownerId ;

        updatePet({
            variables: { 
                id: props.petId,
                "input": {
                    name: a,
                    ownerId: +b
                }
                
            },
            
       });

       props.closeModal()
    }

    console.log(dataPet)


    return (
        <>
            {dataPet !== null && dataPet.getPet &&
                <div className="from-edit-pet">
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" onChange={(e) => handleOnchangePet(e)} defaultValue={dataPet.getPet.name}  className="form-control"/>
                        
                    </div>
                    <div className="form-group">
                        <label>Chủ nhân:</label>
                        <select className="form-select" defaultValue={data.getPet.owner.id} aria-label="Default select example" onChange={(e) => handleOnchaneOwnerId(e)}>
                         
                            {props.listOwner.data && props.listOwner.data["owners"].length > 0 &&
                                props.listOwner.data["owners"].map((item, index) =>{
                                    return(
                                        <option value={item.id} key={index}>{item.name}</option>
                                    )
                                })
                                
                            }
                            
                        
                        
                        </select>

                    </div>
                    <button type="button" className="btn btn-primary" onClick={() => handleSaveEditPet()}>Lưu</button>
                </div>
            }     



        </>

 


    )
}

export default React.memo(EditPet);
