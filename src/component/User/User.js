import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import './User.css'
import { withRouter } from "react-router";
import {getAllUser} from '../Api/User.api'
import { useState } from 'react/cjs/react.development';
const User = (props) => {
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        async function fetchAll(){
            const resq = await getAllUser();
            setListUser(resq)
        }

        fetchAll()

    }, []);

    console.log(listUser.length)


    const handleNewContract = () => {
        props.history.push('/newContract')
    }
    const handleOnlickContractById = (id) => {
        props.history.push(`/newContract/${id}`)
    }

    const handleEditContract = () => {
        props.history.push(`/editContract`)
    }
    return(
        <>
            <div className="new-contract">
                <button onClick={() => handleNewContract()} className="btn-new-contract">Tạo hợp đồng mới</button>
                <button onClick={() => handleEditContract()} className="btn-new-contract">Chỉnh sửa template</button>


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
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td><button className="btn-contract-byid" onClick={()=> handleOnlickContractById(item.id)}>Xem hợp đồng</button></td>
                            
                                </tr>
                            )
                        })


                    
                    }



                </tbody>
            </table>
        </>

    );
}

export default withRouter(User);
