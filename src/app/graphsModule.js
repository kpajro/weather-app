import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
import { Bar } from "react-chartjs-2";
  
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function getLabelsList(list){
    let arr = []
    for(let i = 0; i < list.length; i++){
        if (i % 2 == 1){
            arr.push(list[i].time.split(" ")[1])
        }
    }
    return arr
}

function getTempsList(list){
    let arr = []
    for(let i = 0; i < list.length; i++){
        if (i % 2 == 1){
            arr.push(list[i].temp_c)
        }
    }
    return arr
}

function getHumidityList(list){
    let arr = []
    for(let i = 0; i < list.length; i++){
        if (i % 2 == 1){
            arr.push(list[i].humidity)
        }
    }
    return arr
}

export default function graphModule({_hours}){
    const labels = getLabelsList(_hours)
    const temps = getTempsList(_hours)
    const humidities = getHumidityList(_hours)
    const data = {
        labels: labels,
        datasets: [
          {
            label: "°C",
            data: temps,
            backgroundColor: "rgba(193, 39, 45)"
          },
        ],
      };
    
      const options = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Temperatures",
          },
        },
      };
    
    return (
        <Bar options={options} data={data} />
    )
}