import axios from 'axios'
import { useEffect, useState } from 'react'
import Wrapper from '../../components/Wrapper'
import { User } from '../../models/User'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(()=>{
    (
      async () =>{
        const {data} = await axios.get('users')
        setUsers(data)
      }
    )()
  }, [])

  const del = async (id: number) => {
    if(window.confirm('Are you sure?')){
      await axios.delete(`users/${id}`)

      setUsers(users.filter((u: User)=> u.id !== id))
    }
  }

  return (
    <Wrapper>
      <div className="table-responsive">
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role.name}</td>
                  <td>
                    <div className="btn-group mr-2">
                      <button onClick={()=>del(user.id)} className="btn btn-sm btn-outline-danger outline-red">Delete</button>
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

export default Users