import React, {useEffect} from 'react';
import { Link, NavLink } from 'react-router-dom';
import './User.css'
import { withRouter } from "react-router";
import {getAllUser, getUserAndAttr} from '../Api/User.api'
import { useState } from 'react/cjs/react.development';
import Modal from 'react-awesome-modal';
import ContractModal from './ContractModal';



const User = (props) => {
    const [visibleInfoUser ,setVisibleInfoUser ]= useState(false)
    const [visibleContractUser ,setVisibleContractUser ]= useState(false)

    const [listUser, setListUser] = useState([]);
    const [user, setUser] = useState([])
    const [attr, setAttr] = useState([]);
    // const [contractUser, setContractUser] = useState([])

    const [id, setId] = useState(0)


    //show modal info user
    const openModal = (id) =>{
        setUser([])
        //laays user vs attr
        async function getUser(){
            const resq = await getUserAndAttr(id);
            setUser(resq.user)
            setAttr(resq.attr)
            
        }
  
        getUser()
        setVisibleInfoUser(true)
    } 
    const closeModal = () => {
        setVisibleInfoUser(false)
    }
    
    //show modal contract user
    const openModalContract = (id) =>{
        setVisibleContractUser(true)

        setId(id)
    } 
  
    const closeModalContract = () => {
        setVisibleContractUser(false)
    }


    useEffect(() => {
        async function fetchAll(){
            const resq = await getAllUser();
            setListUser(resq)
        }

        fetchAll()

    }, []);




    const handleNewContract = () => {
        props.history.push('/newContract')
    }
    const handleOnlickContractById = (idUser) => {
        props.history.push(`/contract/AddContractUser/${idUser}/1`)
    }

    const handleEditContract = () => {
        props.history.push(`/editContract/1`)
    }
    const handleSettingAttr = () => {
        props.history.push(`/contract/attribute`)
    }

 

    return(
        <>
            <div className="new-contract">
                <button onClick={() => handleNewContract()} className="btn-new-contract">Tạo hợp đồng mới</button>
                <button onClick={() => handleEditContract()} className="btn-new-contract">Chỉnh sửa template</button>
                <button onClick={() => handleSettingAttr()} className="btn-new-contract">Setting <i className="far fa-cog"></i></button>



            </div>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên nhân viên</th>
                    <th scope="col">Email</th>
                    <th scope="col">Active</th>
                    
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 &&
                       
                        listUser.map((item, index) => {
        
                            return(
                                <tr key={item.id}>
                                    <th scope="row">{item.id}</th>
                                    <td onClick={() => openModal(item.id)} style={{color: "blue", cursor: "pointer"}}>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        {item.userToContract.length > 0 ?
                                            <button className="alert alert-primary" onClick={() => openModalContract(item.id)}>Xem hợp đồng</button>
                                        :
                                            <button className="alert alert-danger" onClick={()=> handleOnlickContractById(item.id)}>Tạo ngay</button>
                                        } 
                                        
                                       
                                    </td>
                            
                                </tr>
                            )
                        })


                    
                    }



                </tbody>
            </table>
            <section>
                
                <Modal 
                    visible={visibleInfoUser}
                    width="1000"
                    height="600"
                    effect="fadeInUp"
                    onClickAway={() => closeModal()}
                >
                    <div className="form-attr">
                        {user && Object.keys(user).length &&
                            <>

                                <label>Name:</label>
                                <input type="text" defaultValue={user.name} className="form-control input-lable" />

                                <label>Email:</label>
                                <input type="text" defaultValue={user.email} className="form-control input-lable" />

                                 <label>Address:</label>
                                <input type="text" defaultValue={user.address} className="form-control input-lable" />

                                 <label>Phone:</label>
                                <input type="text" defaultValue={user.phone} className="form-control input-lable" />

                              
                            </>

                              
                            
                        }
                        
                        {attr && attr.length > 0 && user &&  user.values.length &&
                               
                                attr.map((item, index) => {
                                const value = user.values.filter(it => it.attribute_id === item.id)
                            
                                return(
                                    <div key={index}>
                                        <label>{item.name}:</label>
                                        <input type="text" defaultValue={value.length !== 0 ? value[0].value : ""} className="form-control input-lable" />
                    
                                    </div>                            
                                )
                                
                            })


                        }
      
                       <button className="btn-save-attr">Lưu</button>
                    </div>
                </Modal>
            </section>
            
            <section>
                
                <Modal 
                    visible={visibleContractUser}
                    width="1000"
                    height="600"
                    effect="fadeInUp"
                    onClickAway={() => closeModalContract()}
                >
                    <ContractModal id={id} />
                </Modal>
            </section>  
            
        </>
       

    );
}

export default withRouter(User);
