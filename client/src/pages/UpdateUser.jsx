import Form from '../components/Form';

const UpdateUser = ({currId}) =>{
    return <div className="updateUser">
        <h1>Update existing user</h1>
        <Form currId={currId} indicator="Update user" />
    </div>
}

export default UpdateUser;