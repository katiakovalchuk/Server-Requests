import {useState} from 'react';

import './style.scss';

const User = ({user, onDelete, onUpdate, onAddField}) => {

    const [newUser, setNewUser] = useState({...user});
    const [newField, setNewField] = useState({title: '', value: ''});
    const [addField, setAddField] = useState(false);
    const [edit, setEdit] = useState(false);

    const handleUpdate = e => {
        e.preventDefault();
        onUpdate(user.id, newUser.name, newUser.email);
        setEdit(false);
    }

    const handleAddField = e => {
        e.preventDefault();
        onAddField(user.id, newField.title, newField.value);
        setAddField(false);
        setNewField({title: '', value: ''});
        alert(`New field ${newField.title} has been added`);
    }

    const handleDelete = () => {
        onDelete(user.id);
    }

    return (
        <li className='User'>
            <div className='User__data'>
                <div>
                    <div>{user.name}, </div>
                    <div>email: {user.email}</div>
                </div>
                <span>
                    {
                        !addField &&
                        <button className='btn' onClick={() => setAddField(true)}>
                            add field
                        </button>
                    }
                    {
                        !edit &&
                        <button className='btn' onClick={() => setEdit(true)}>
                            edit
                        </button>
                    }
                    <button className='btn' onClick={handleDelete}>delete</button>
                </span>
            </div>
            <div className='forms'>
                {
                    edit &&
                    <div>
                        <h3 className='forms__heading'>You may edit data in the form below</h3>
                        <form className='edit-form' onSubmit={handleUpdate}>
                            <label className='edit-form__element'>
                                <span>Name:&nbsp;</span>
                                <input
                                    className='edit-form__input'
                                    type='text'
                                    required
                                    value={newUser.name}
                                    onChange={e => setNewUser({...newUser, name: e.target.value})}
                                />
                            </label>
                            <label className='edit-form__element'>
                                <span>Email:&nbsp;</span>
                                <input
                                    className='edit-form__input'
                                    type='email'
                                    required
                                    value={newUser.email}
                                    onChange={e => setNewUser({...newUser, email: e.target.value})}
                                />
                            </label>
                            <div>
                                <button className='btn'>save</button>
                                <button className='btn' onClick={() => setEdit(false)}>cancel</button>
                            </div>
                        </form>
                    </div>
                }
                {
                    addField &&
                    <div>
                        <h3 className='forms__heading'>You may add new field in the form below</h3>
                        <form className='add-form' onSubmit={handleAddField}>
                            <input
                                className='add-form__input'
                                type='text'
                                placeholder='New field title'
                                required
                                value={newField.title}
                                onChange={e => setNewField(prev => ({...prev, title: e.target.value}))}
                            />
                            <input
                                className='add-form__input'
                                type='text'
                                placeholder='New field value'
                                required
                                value={newField.value}
                                onChange={e => setNewField(prev => ({...prev, value: e.target.value}))}
                            />
                            <div>
                                <button className='btn' type='submit'>save</button>
                                <button className='btn' onClick={() => setAddField(false)}>cancel</button>
                            </div>
                        </form>
                    </div>
                }
            </div>
        </li>
    )
}

export default User;
