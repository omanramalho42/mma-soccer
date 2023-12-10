import React, { useEffect } from 'react';
import Chart from 'chart.js/auto'; // Importe 'chart.js/auto' para obter a versão mais recente

const RadialChart = () => {
  useEffect(() => {
    // Obtenha o contexto do canvas
    // @ts-ignore
    const ctx = document.getElementById('my2Chart2').getContext('2d');

    // Crie o gráfico
    const myChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: 'My First dataset',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderColor: 'rgb(14, 14, 14)',
          borderWidth: 1,
          data: [10, 20, 30, 40, 50, 0, 5],
        }]
      },
      options: {
        scales: {
          r: {
            angleLines: {
              color: 'red'
            }
          }
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
      <canvas id="my2Chart2"></canvas>
    </div>
  );
};

export default RadialChart;
