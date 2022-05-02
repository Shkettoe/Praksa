import axios from 'axios'
import { SyntheticEvent, useEffect, useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Wrapper from '../../components/Wrapper'
import ImageUpload from '../../components/ImageUpload'

const ProductCreate = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState('')
    const [redirect, setRedirect] = useState(false)
    const id = useParams().id
    const ref = useRef<HTMLInputElement>(null)

    useEffect(()=>{
        (
            async () => {
                const {data} = await axios.get(`products/${id}`)

                console.log(data)
                
                setTitle(data.title)
                setDescription(data.description)
                setImage(data.image)
                setPrice(data.price)
            }
        )()
    }, [])

    const updateUrl = (url:string) =>{
        if(ref.current) {
            ref.current.value = url
        }
        setImage(url)
    }

    const submit = async(e: SyntheticEvent) => {
        e.preventDefault()

        const {data} = await axios.patch(`products/${id}`, {
            title,
            description,
            image,
            price: parseInt(price)
        })

        console.log(data)

        setRedirect(true)
    }

    if(redirect) return <Navigate to={'/products'}/>

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label>Name</label>
                    <input type="text" defaultValue={title} className="form-control" onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Name</label>
                    <textarea defaultValue={description} className="form-control" onChange={e => setDescription(e.target.value)}></textarea>
                </div>
                <div className="mb-3">
                    <label>Image</label>
                    <div className="input-group">
                        <input ref={ref} className="form-control" defaultValue={image} onChange={e => setImage(e.target.value)} />
                        <ImageUpload upl={updateUrl}/>
                    </div>
                </div>
                <div className="mb-3">
                    <label>Name</label>
                    <input type={"number"} defaultValue={price} className="form-control" onChange={e => setPrice(e.target.value)} />
                </div>
                <button className="btn btn-outline-success">Save</button>
            </form>
        </Wrapper>
    )
}

export default ProductCreate