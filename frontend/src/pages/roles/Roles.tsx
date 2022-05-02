import axios from 'axios'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Wrapper from '../../components/Wrapper'
import { Role } from '../../models/Role'

const Roles = () => {
  const [roles, setRoles] = useState([])

  useEffect(()=>{
    (
      async () =>{
        const {data} = await axios.get('roles')
        setRoles(data)

        console.log(data)
      }
    )()
  }, [])

  const del = async (id: number) => {
    if(window.confirm('Are you sure?')){
      await axios.delete(`roles/${id}`)

      setRoles(roles.filter((r: Role)=> r.id !== id))
    }
  }

  return (
    <Wrapper>
      <div className="table-responsive">
        <NavLink to={'create'} className="btn btn-outline-primary mb-3">Create</NavLink>
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Permissions</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role: Role) => {
              return (
                <tr key={role.id}>
                  <td>{role.id}</td>
                  <td>{role.name}</td>
                  <td>{role.permissions.map(p=><div className="badge bg-primary d-inline-block ms-1">{p.name}</div>)}</td>
                  <td>
                    <div className="btn-group">
                      <NavLink to={`${role.id}/edit`} className="btn btn-sm btn-outline-warning outline-red">Update</NavLink>
                    </div>
                    <div className="btn-group">
                      <button onClick={()=>del(role.id)} className="btn btn-sm btn-outline-danger outline-red d-inline-block ms-2">Delete</button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  )
}

export default Roles