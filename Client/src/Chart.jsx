import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";


import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Chart({ data }) {
    const options = {
    responsive: true,
    indexAxis: "y",
    plugins: {
    legend: {
        position: "top",
    },
    tooltip: {
      callbacks: {
        label: (context) => {
            const d = context.raw;
            if (Array.isArray(d[0])) return ""; 
            return `${context.dataset.label}: ${d.x[0]}h - ${d.x[1]}h`;
        }
      }
    },
    title: {
        display: true,
        text: "Subjects Distribution",
    },
    },
    scales: {
  x: {
    stacked:true,
    min: 0,
    max: 9,
    title: {
      display: true,
      text: "Hours",
    },
    ticks: {
      stepSize: 3,
      callback: (value) => `${value}h`

    }
  },
  y: {
    stacked: true,
    title: {
      display: true,
      text: "Subjects",
    },
  },
},
};

  return (
    <div style={{ marginTop: "30px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default Chart;