import {useState, useEffect} from 'react';

import {useNavigate} from 'react-router-dom';

const Home = ({setCurrId}) =>{
    const [users, setUsers] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() =>{
        const getUsers = async () =>{
            const response = await fetch('http://localhost:8080/api/user-info', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            });
            const json = await response.json();
            setUsers(json);
        }
        getUsers();
    }, []);

    const handleOnClickUpdate = async id =>{
        setCurrId(id);
        navigate('/update');
    } 

    const handleOnClickDelete = async id =>{
        setCurrId(id);
    }
    return <div className="home">
        <table className="table">
            <thead>
                <tr>
                    <th>S/N</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users?.map(({_id, name, email, address}, index) => {
                        return <tr key={_id}>
                            <td>{index + 1}</td>
                            <td>{name}</td>
                            <td>{email}</td>
                            <td>{address}</td>
                            <td>
                                <span onClick={() => handleOnClickUpdate(_id)}>Update</span>
                                <span onClick={() => handleOnClickDelete(_id)}>Delete</span>
                            </td>
                        </tr>
                    })
                }
            </tbody>
            <tfoot>
                <tr>
                    <th>S/N</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
            </tfoot>
        </table>
        <div className="btn">
            <button onClick={() => navigate('/create')} type="button">Create New User</button>
        </div>
    </div>
}

export default Home;