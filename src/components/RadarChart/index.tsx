import React, { useEffect } from 'react';
import Chart from 'chart.js/auto'; // Importe 'chart.js/auto' para obter a versão mais recente

const RadarChart = () => {
  useEffect(() => {
    // Obtenha o contexto do canvas
    // @ts-ignore
    const ctx = document.getElementById('myChart').getContext('2d');

    // Crie o gráfico
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          backgroundColor: 'rgba(184, 0, 0, 0.5)',
          borderColor: 'rgb(0, 0, 0)',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          x: {
            border: {
              color: '#fff'
            },
            grid: {
              tickColor: '#fff'
            },
            title: {
              color: '#fff',
              display: true,
              text: 'teste'
            }
          },
          y: {
            beginAtZero: true,
            border: {
              color: '#fff'
            },
            grid: {
              tickColor: '#fff'
            },
            title: {
              color: '#fff',
              display: true,
              text: 'teste'
            }
          },
        }
      }
    });

    // Certifique-se de limpar o gráfico ao desmontar o componente para evitar vazamento de memória
    return () => {
      myChart.destroy();
    };
  }, []); // O segundo argumento vazio significa que useEffect será executado apenas uma vez após a montagem

  return (
    <div style={{ width: 800, height: 800 }}> 
      <canvas id="myChart"></canvas>
    </div>
  );
};

export default RadarChart;
