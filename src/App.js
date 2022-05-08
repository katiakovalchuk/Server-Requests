import {useEffect, useState} from 'react';

import User from './components/User';
import AddUser from './components/AddUser';
import useFetch from './components/hooks/useFetch';

import './App.scss';

const App = () => {
    const [users, setUsers] = useState([]);
    const {data, loading, error} = useFetch('https://jsonplaceholder.typicode.com/users');

    useEffect(() => {
        setUsers(data);
    }, [data])

    if (loading) return 'Loading...';

    if (error) return null;

    const onAddUser = async (name, email) => {
        await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({name, email})
        })
            .then(res => {
                if (res.status !== 201) return;
                return res.json();
            })
            .then(data => {
                setUsers(users => [...users, data])
            })
            .catch(err => console.log(err))
    }

    const onUpdateUser = async (id, name, email) => {
        await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({name, email})
        })
            .then(res => {
                if (!res.ok) return;
                return res.json();
            })
            .then(data => {
                setUsers(users => users.map(user => {
                        if (user.id === data.id) {
                            return {...user, name, email}
                        }
                        return user;
                    })
                )
            })
    }

    const onAddUserField = async (id, fieldTitle, fieldValue) => {
        await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                [fieldTitle]: fieldValue
            })
        })
            .then(res => res.json())
            .then(data => {
                setUsers(users => users.map(user => {
                        if (user.id === data.id) {
                            return {...user, [fieldTitle]: fieldValue}
                        }
                        return user;
                    })
                )
            })
    }

    const onDeleteUser = async id => {
        await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then(res => {
                if (res.status !== 200) return;
                setUsers(users.filter(user => user.id !== id));
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='App'>
            <AddUser onAddUser={onAddUser}/>
            <div className='App__user-info'>
                {
                    users && users.length ? (
                        <div>
                            <h2 className='App__heading'>User list</h2>
                            <ul className='list'>
                                {users.map(user => {
                                    return <User key={user.id} user={user} onDelete={onDeleteUser}
                                                 onUpdate={onUpdateUser} onAddField={onAddUserField}
                                    />
                                })}
                            </ul>
                        </div>
                    ) : (
                        <div>Please add new users</div>
                    )
                }
            </div>
        </div>
    );
}

export default App;
