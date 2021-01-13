import React,{useState,useEffect} from 'react'
import AdminDashboard from './AdminDashboard'
import {AllProducts} from "./APIcalls"
import {Line} from 'react-chartjs-2'

export default function Report() {
    var Products = []

    var Label = []
    var data1= []
    var data2 = []
    
    var state = {
        labels: [],
        datasets:[
            {
                label: "stock",
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(217,83,79,1)',
                borderColor: 'rgba(217,83,79,0.5)',
                borderWidth:2,
                data:[]
            },
            {
                label: "sold",
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(75,192,192,0.5)',
                borderWidth:2,
                data:[]
            }
        ]
    }
    const [graph, setgraph] = useState("")

    const preload = () => {
        AllProducts()
        .then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                Products = data;
                Products.map((product)=>{
                    Label.push(product.p_name);
                    data1.push(product.stock)
                    data2.push(product.quant_unit)
                });
                state.labels = Label;
                state.datasets[0].data = data1;
                state.datasets[1].data = data2;
                setgraph(state)
               
            }
        })
    }

    useEffect(() => {
       preload();
    }, [])
    
    return (
        <AdminDashboard title="Sales Report">
           <Line data={graph} options={{
               title:{
                   display:true,
                   text:"How many products are sold",
                   fontSize:20
               },
              legend: {
                    display:true,
                    position:"right"
               }
           }}></Line>
        </AdminDashboard>
    )
}
