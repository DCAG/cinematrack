import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const PERMISSIONS_LIST = [
    'View Subscriptions',
    'Create Subscriptions',
    'Delete Subscriptions',
    'Update Subscriptions',
    'View Movies',
    'Create Movies',
    'Delete Movies',
    'Update Movies'
]

function AddUserPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user, setUser] = useState({firstName: '', lastName: '', username: '', sessionTimeout: 0, createdDate:'', permissions: [] /* the 'permissions' state is used for user input */})
    const [permissions,setPermissions] = useState({})

    const convertPermissionsFromList = (permissionsList) => {
        let result = {}
        PERMISSIONS_LIST.forEach(item => {result[item] = Array.isArray(permissions) && permissionsList.includes(item)})
        return result
    }
    const convertPermissionsToList = (permissionsObject) => {
        return PERMISSIONS_LIST.filter(permission => permissionsObject[permission])
    }

    useEffect(() => {
        setPermissions(convertPermissionsFromList([]))
    },[])

    const handleCheck = (e) => {
        // dependency is for viewing purposes. This will be be enforced on the server side as well.
        let dependency = {}
        if(['Create Subscriptions','Update Subscriptions','Delete Subscriptions'].includes(e.target.name) && e.target.checked){            
            dependency = {'View Subscriptions': true}
        }
        else if(['Create Movies','Update Movies','Delete Movies'].includes(e.target.name) && e.target.checked ){
            dependency = {'View Movies': true}
        }
        setPermissions(previous => {return {
            ...previous,
            ...dependency,
            [e.target.name]:e.target.checked
        }})
    }

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setUser(previous => { return {...previous, [name]: value}})
    }

    const handleSave = () => {
        //TODO: verify handleSave works
        dispatch({type: 'USER_CREATE', payload: {...user, permissions: convertPermissionsToList(permissions)}})
        // redirect to all users
        navigate('../')
    }

    const handleCancel = () => {
        // redirect to all users
        navigate('../')
    }

    return (
    <div>
        <h1>
            Add New User
        </h1>
        First Name: <input type="text" name="firstName" value={user?.firstName} onChange={handleChange} /> <br />
        Last Name: <input type="text" name="lastName" value={user?.lastName} onChange={handleChange} /> <br />
        Username: <input type="text" name="username" value={user?.username} onChange={handleChange} /> <br />
        Session Timeout (Minutes): <input type="number" name="sessionTimeout" value={user?.sessionTimeout} onChange={handleChange} /> <br />
        Permissions: <br />
        {/* TODO: move style to css file */}
        <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
        {
            Object.keys(permissions).map(item => {
                return (
                    <label key={item}>
                        <input type="checkbox" name={item} checked={permissions[item]??false} onChange={handleCheck} />
                        {item}
                    </label>
                )
            })
        }
        </div>
        <br />
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
    </div>
    )
}

export default AddUserPage