import axios from 'axios'
import { SyntheticEvent, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Wrapper from '../../components/Wrapper'
import ImageUpload from '../../components/ImageUpload'

const ProductCreate = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState('')
    const [redirect, setRedirect] = useState(false)

    const submit = async(e: SyntheticEvent) => {
        e.preventDefault()

        await axios.post(`products`, {
            title,
            description,
            image,
            price: parseInt(price)
        })

        setRedirect(true)
    }

    if(redirect) return <Navigate to={'/products'}/>

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label>Name</label>
                    <input type="text" className="form-control" onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Name</label>
                    <textarea name="" id="" cols={30} rows={10} className="form-control" onChange={e => setDescription(e.target.value)}></textarea>
                </div>
                <div className="mb-3">
                    <label>Image</label>
                    <div className="input-group">
                        <input type="text" className="form-control" value={image} onChange={e => setImage(e.target.value)} />
                        <ImageUpload upl={setImage}/>
                    </div>
                </div>
                <div className="mb-3">
                    <label>Name</label>
                    <input type={"number"} className="form-control" onChange={e => setPrice(e.target.value)} />
                </div>
                <button className="btn btn-outline-success">Save</button>
            </form>
        </Wrapper>
    )
}

export default ProductCreate