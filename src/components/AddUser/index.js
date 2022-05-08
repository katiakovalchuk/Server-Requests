import {useState} from 'react';

import './style.scss';

const AddUser = ({onAddUser}) => {
    const [user, setUser] = useState({
        name: '',
        email: ''
    });

    const handleOnSubmit = e => {
        e.preventDefault();
        onAddUser(user.name, user.email);
        setUser({
            name: '',
            email: ''
        })
        alert('User has been added');
    }

    return (
        <form className='AddUser' onSubmit={handleOnSubmit}>
            <input
                className='AddUser__input'
                type='text'
                placeholder='User name'
                required
                value={user.name}
                onChange={e => setUser(prev => ({...prev, name: e.target.value}))}
            />
            <input
                className='AddUser__input'
                type='email'
                placeholder='Email'
                required
                value={user.email}
                onChange={e => setUser(prev => ({...prev, email: e.target.value}))}
            />
            <button className='btn' type='submit'>
                Add user
            </button>
        </form>
    )
}

export default AddUser;
