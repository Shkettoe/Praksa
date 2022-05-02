import axios from 'axios'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Wrapper from '../../components/Wrapper'
import { Order } from '../../models/Order'
import { OrderItem } from '../../models/OrderItem'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [selected, setSelected] = useState(0)

  const hide = {
      maxHeight: 0,
      transition: '100ms ease-in'
  }

  const show = {
      maxHeight: '150px',
      transition: '100ms ease-in'
  }

  useEffect(()=>{
    (
      async () =>{
        const {data} = await axios.get('orders')
        setOrders(data)
      }
    )()
  }, [])

  const select = async (id: number) => {
    setSelected(selected !== id ? id : 0)
  }

  const exp = async () => {
    const {data} = await axios.post('orders/export', {}, {responseType: 'blob'})
    const blob = new Blob([data], {type: 'text/csv'})
    const url = window.URL.createObjectURL(data)
    const link = document.createElement('a')
    link.href = url
    link.download = 'orders.csv'
    link.click()
  }

  return (
    <Wrapper>
      <div className="table-responsive">
        <a onClick={exp} className="btn btn-outline-primary mb-3">Create</a>
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: Order) => {
              return (
                  <>
                    <tr>
                    <td>{order.id}</td>
                    <td>{order.name}</td>
                    <td>{order.email}</td>
                    <td><div className="btn-group">
                      <button onClick={() => select(order.id)} className="btn btn-sm btn-outline-secondary outline-red d-inline-block ms-2">View</button>
                    </div></td>
                    </tr>
                    <tr>
                        <td colSpan={5}>
                            <div className='overflow-hidden' style={selected === order.id ? show : hide}>
                                <table className="table tablesm">
                                    <thead>
                                        <th>#</th>
                                        <th>#</th>
                                        <th>#</th>
                                        <th>#</th>
                                    </thead>
                                    <tbody>
                                        {order.order_items.map((oi: OrderItem)=>{
                                            return(
                                                <tr key={oi.id}>
                                                    <td>{oi.id}</td>
                                                    <td>{oi.product_title}</td>
                                                    <td>{oi.quantity}</td>
                                                    <td>{oi.price}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                  </>
              )
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  )
}

export default Orders