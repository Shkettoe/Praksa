import axios from 'axios'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Wrapper from '../../components/Wrapper'
import { Product } from '../../models/Product'
import { Role } from '../../models/Role'

const Products = () => {
    const [products, setProducts] = useState([])
    
    useEffect(()=>{
        (
          async () =>{
            const {data} = await axios.get('products')
            setProducts(data)
          }
        )()
      }, [])

    const del = async (id: number) => {
        if(window.confirm('Are you sure?')){
            await axios.delete(`products/${id}`)
            setProducts(products.filter((r: Product)=> r.id !== id))
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
                  <th scope="col">Title</th>
                  <th scope="col">Image</th>
                  <th scope="col">Description</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: Product) => {
                  return (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.title}</td>
                      <td><img height={50} src={product.image} alt="" /></td>
                      <td>{product.description}</td>
                      <td>{product.price}</td>
                      <td>
                        <div className="btn-group">
                          <NavLink to={`${product.id}/edit`} className="btn btn-sm btn-outline-warning outline-red">Update</NavLink>
                        </div>
                        <div className="btn-group">
                          <button onClick={()=>del(product.id)} className="btn btn-sm btn-outline-danger outline-red d-inline-block ms-2">Delete</button>
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

export default Products