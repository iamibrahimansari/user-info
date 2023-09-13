import {useState} from 'react';

import {useNavigate} from 'react-router-dom';

const Form = ({indicator, currId}) =>{
    const [error, setError] = useState(null);
    const [formInfo, setFormInfo] = useState({
        name: '',
        email: '',
        address: ''
    })
    const navigate = useNavigate();
    const handleOnChange = async event =>{
        const {name, value} = event.target;
        setFormInfo(prev => ({...prev, [name]: value}));
    }

    const getUser = async id =>{
        const response = await fetch(`http://localhost:8080/api/user-info/${id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        if(response.ok){
            const json = await response.json();
            return json;
        }
    }

    const handleForm = async event =>{
        event.preventDefault();
        const response = await fetch(indicator === 'Create user' ? 'http://localhost:8080/api/user-info' : `http://localhost:8080/api/user-info/${userId}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formInfo)
        })
        const json = await response.json();
        if(!response.ok){
            setError(json.error);
        }else{
            navigate('/');
            if(indicator === 'Create user'){
                setFormInfo({name: '', email: '', address: ''})
            }else{
                const result = await getUser(currId);
                setFormInfo({name: result.name, email: result.email, address: 'result.address'});
            }
        }
        
    }

    return <form method="POST" className="form" onSubmit={handleForm}>
        <label>
            <span>Name</span>
            <input onChange={handleOnChange} type="text" name="name" value={formInfo.name} />
        </label>
        <label>
            <span>Email</span>
            <input onChange={handleOnChange} type="email" name="email" value={formInfo.email} />
        </label>
        <label>
            <span>Name</span>
            <textarea onChange={handleOnChange} name="address" cols="30" rows="10" value={formInfo.address}></textarea>
        </label>
        <div className="btn">
            <button type="submit" style={{cursor: 'pointer'}}>{indicator}</button>
        </div>
        {
            error &&
            <p className="error">{error}</p>
        }
    </form>
}

export default Form;