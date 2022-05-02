import Wrapper from '../components/Wrapper'
import * as c3 from 'c3'
import { useEffect } from 'react'
import axios from 'axios'

const Dashboard = () => {
  useEffect(() => {
    (
      async () => {
        const chart = c3.generate({
          bindto: '#chart',
          data: {
            x: 'x',
            columns:[
              ['x', 1, 2],
              ['Sales', '2022-01-01', '2022-01-05']
            ],
            types:{
              Sales: 'bar'
            }
          },
          axis:{
            x: {type: 'timeseries', tick: { format: '%Y-%m-%d'}}
          }
        })

        const {data} = await axios.post('orders/chart', {})
      
        chart.load({
          columns:[
            ['x', ...data.map((o: any) => o.date)],
            ['Sales', ...data.map((o: any) => o.sum)]
          ]
        })
      }
    )()
  },[])
  return (
    <Wrapper>
      <>
        <h1 className="h2">Dashboard</h1>
        <div id='chart' />
      </>
    </Wrapper>
  )
}

export default Dashboard