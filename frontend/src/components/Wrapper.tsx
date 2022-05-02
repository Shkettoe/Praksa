import axios from 'axios'
import { connect } from 'react-redux'
import { Dispatch, FC, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Nav from './Nav'
import { User } from '../models/User'
import { setUser } from '../redux/actions/setUserAction'

interface PropsInterface {
    children: JSX.Element
}

const Wrapper: FC<PropsInterface> = (props: any) => {
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        (
            async () => {
                try{
                    const {data} = await axios.get('')
                    props.setUser(
                        new User(
                            data.id,
                            data.username,
                            data.email,
                            data.role
                        )
                    )
                }
                catch(err){
                    setRedirect(true)
                }
            }
        )()
    }, [])

    if(redirect) return <Navigate to={"/login"}/>

    return (
        <>
            <Nav />
            <div className="mt-4 container-fluid">
                <div className="row">
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        {props.children}
                    </main>
                </div>
            </div>
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper)