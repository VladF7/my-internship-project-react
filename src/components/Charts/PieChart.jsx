import { Pie } from 'react-chartjs-2'

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: 'rgba(255, 255, 255, 0.9)',
        font: {
          size: 12
        }
      }
    },

    title: {
      display: true,
      color: 'rgba(255, 255, 255, 0.95)',
      font: {
        size: 14,
        weight: 'normal'
      }
    }
  }
}

const PieChart = ({ labels, data, titleText, label }) => {
  options.plugins.title.text = titleText
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 2,
        tension: 0.1
      }
    ]
  }
  return <Pie data={chartData} options={options} />
}

export default PieChart
