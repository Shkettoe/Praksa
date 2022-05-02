import axios from 'axios'
import { SyntheticEvent, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Wrapper from '../../components/Wrapper'
import { Permission } from '../../models/Permission'

const RoleCreate = () => {
    const [name, setName] = useState('')
    const [permissions, setPermissions] = useState([] as string[])
    const [allPermissions, setAllPermissions] = useState([])
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        (async () => {
            const allPerms = await axios.get('permissions')
            setAllPermissions(allPerms.data)
        })()
    },[])

    const checkPerm = (perm: string) => {
        if(permissions.some(p=>p===perm)){
            setPermissions(permissions.filter(p=>p!==perm))
            return
        }

        setPermissions([...permissions, perm])
    }

    const submit = async(e: SyntheticEvent) => {
        e.preventDefault()

        await axios.post(`roles`, {
            name,
            permissions: allPermissions.filter((p: Permission) => {
                if(permissions.includes(p.name)) return p.id
            })
        })

        setRedirect(true)
    }

    if(redirect) return <Navigate to={'/roles'}/>

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="username">Name</label>
                    <input type="text" className="form-control" onChange={e => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className='pb-3' htmlFor="role">Permissions</label><br />
                    {allPermissions.map((r: Permission) => {
                        return(
                            <div key={r.id} className="form-check form-check-inline col-4">
                                <input className='form-check-input' value={r.name} onChange={() => checkPerm(r.name)} type="checkbox" name="" id="" />
                                <label className="form-check-label">{r.name}</label>
                                <hr />
                            </div>
                        )
                    })}
                </div>

                <button className="btn btn-outline-success">Save</button>
            </form>
        </Wrapper>
    )
}

export default RoleCreate