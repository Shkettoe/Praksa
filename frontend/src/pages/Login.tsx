import axios from 'axios'
import { FormEvent, useState } from 'react'
import { Navigate } from 'react-router-dom'

const Login = () => {
    const [redirect, setRedirect] = useState(false)

    const User = {
        email: '',
        password: ''
    }

    const onChangeFunction = (_key: string, _value: string) => {
        User[_key as keyof typeof User] = _value
    }

    const submit = async (e: FormEvent) => {
        e.preventDefault()
        const data = await axios.post('users/login', User)
        console.log(data)
        setRedirect(Boolean(data))
    }

    if(redirect) return <Navigate to={'/'} />

    return (
        <div>
            <form onSubmit={(e) => submit(e)} className="form-signin">
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <input type="email" id='email' className="form-control" placeholder="Email address" required onChange={e => onChangeFunction(e.target.id, e.target.value)} />
                <input type="password" id='password' className="form-control" placeholder="Password" required onChange={e => onChangeFunction(e.target.id, e.target.value)} />
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
            </form>
        </div>
    )
}

export default Login