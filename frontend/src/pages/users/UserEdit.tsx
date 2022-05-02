import axios from 'axios'
import { Dispatch, SyntheticEvent, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Wrapper from '../../components/Wrapper'
import { Role } from '../../models/Role'
import { connect } from 'react-redux'
import { User } from '../../models/User'
import { setUser } from '../../redux/actions/setUserAction'

const UserEdit = (props: {user: User, setUser: (user: User)=>void}) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [role_id, setRoleId] = useState('')
    const [roles, setRoles] = useState([])
    const [redirect, setRedirect] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordConf, setPasswordConf] = useState('')
    const [err, setErr] = useState('')
    let id = useParams().id

    useEffect(() => {
        (async () =>{
            const roles = await axios.get('roles')
            setRoles(roles.data)
            
            setUsername(props.user.username)
            setEmail(props.user.email)
            setRoleId(String(props.user.role.id))
        })()

    },[props.user])

    const submit = async(e: SyntheticEvent) => {
        e.preventDefault()
        if(password.length > 0){
            if(password.length < 8 || password !== passwordConf){
                setErr('Invalid password input')
                return
            }
            const{data} = await axios.patch(`users/${id}`,{
                username,
                email,
                role: parseInt(role_id),
                password
            })

            props.setUser(data)
        }

        const {data} = await axios.patch(`users/${id}`, {
            username: username,
            email: email,
            role: parseInt(role_id)
        })
        props.setUser(new User(
            data.id,
            data.username,
            data.email,
            data.role
        ))

        setRedirect(true)
    }

    if(redirect) return <Navigate to={'/users'}/>

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" defaultValue={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control" defaultValue={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="role">Role</label>
                    <select value={role_id} name="role" id="role" className="form-control" onChange={e => setRoleId(e.target.value)}>
                        {roles.map((r: Role) => {
                            return(
                                <option key={r.id} value={r.id}>{r.name}</option>
                            )
                        })}
                    </select>
                </div>

                <h1>Change Password</h1>
                <div className="mb-3">
                    <label htmlFor="username">Password</label>
                    <input type="password" className="form-control" onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="username">Confirm password</label>
                    <input type="password" className="form-control" onChange={e => setPasswordConf(e.target.value)} />
                </div>
                <button className="btn btn-outline-success">Save</button>
                <p className='danger'>{err}</p>
            </form>
        </Wrapper>
    )
}
const mapStateToProps = (state: {user: User}) => {
    return{
        user: state.user
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return{
        setUser: (user: User) => dispatch(setUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit)