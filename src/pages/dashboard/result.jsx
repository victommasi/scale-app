import React from 'react';
import inbodylogo from '../../assets/images/inbody-logo.png'
import exampleFull from '../../data/example-full'
import Chart from "react-apexcharts";
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

const weightGridNumbers = [55, 70, 85, 100, 115, 130, 145, 160, 175, 190, 205]
const muscleGridNumbers = [70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170]
const fatGridNumbers = [40, 60, 80, 100, 160, 220, 280, 340, 400, 460, 520]
const imcGridNumbers = [10.0, 15.0, 18.5, 21.0, 25.0, 30.0, 35.0, 40.0, 45.0, 50.0, 55.0]
const pgcGridNumbers = ['08', 13.0, 18.0, 23.0, 28.0, 33.0, 38.0, 43.0, 48.0, 53.0, 58.0]

export const Result = ({patient, exam}) => {
  return (
    <article className='flex gap-10 container'>
      <div className='flex flex-col w-2/3 gap-10'>
        <div className='border-b-4 border-b-red-900 h-12'>
          <img src={inbodylogo} className="w-[150px] h-auto" /> 
        </div>
        <PatientInfoTable patient={patient} exam={exam} />
        <BodyCompositionAnalyzis />
        <MuscleFatAnalyzis />
        <FatAnalyzis />
        <BodyCompositionHistoric />
      </div>
      <div className='flex flex-col w-1/3 gap-4'>
        <section className='w-full h-36'></section>
        <InbodyPoints exam={exam} />
        <WeightControl exam={exam} />
        <ResultInfo />
      </div>
    </article>
  )
}

const PatientInfoTable = ({patient, exam}) => {
  return (
    <table className='w-full -mt-8 max-w-[640px]'>
      <thead>
        <tr className='text-left'>
          <th className='w-40 border-l-[3px] border-l-gray-500 pl-2'>Nome</th>
          <th className='border-l-[3px] border-l-gray-500 pl-2'>Altura</th>
          <th className='border-l-[3px] border-l-gray-500 pl-2'>Idade</th>
          <th className='border-l-[3px] border-l-gray-500 pl-2'>Sexo</th>
          <th className='border-l-[3px] border-l-gray-500 pl-2'>Data / Hora do Exame</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className='w-40 border-l-[3px] border-l-gray-500 pl-2'>John Doe</td>
          <td className='border-l-[3px] border-l-gray-500 pl-2'>159cm</td>
          <td className='border-l-[3px] border-l-gray-500 pl-2'>51</td>
          <td className='border-l-[3px] border-l-gray-500 pl-2'>Feminino</td>
          <td className='border-l-[3px] border-l-gray-500 pl-2'>15/03/2023 15:54</td>
        </tr>
      </tbody>
    </table> 
  )
}

const BodyCompositionAnalyzis = ({exam}) => {
  return (
    <div className="w-full max-w-[640px]">
      <h2 className='text-lg font-semibold text-gray-800 border-b-4 border-b-gray-400'>Análise da Composição Corporal</h2>
      <table className='w-full text-sm'>
        <tbody>
          <tr>
            <td colSpan="2" className='bg-blue-gray-100 border-b border-b-white h-8 p-2'>Quantidade de água corporal, proteínas e minerais.</td>
            <td className='border-b border-b-blue-gray-200 p-2 font-bold text-base'>27.8 (26.3 ~ 31.4)</td>
          </tr>
          <tr>
            <td className='bg-blue-gray-100 border-b border-b-white h-8 p-2'>Para armazenar energia</td>
            <td className='bg-blue-gray-100 border-b border-b-white p-2 font-bold'>Massa de Gordura (kg)</td>
            <td className='border-b border-b-blue-gray-200 p-2 font-bold text-base'>21.8 (10.3 ~ 16.5)</td>
          </tr>
          <tr>
            <td className=' bg-blue-gray-100 border-b border-b-gray h-8 p-2'>A soma acima</td>
            <td className='bg-blue-gray-100 border-b border-b-gray p-2 font-bold'>Peso (kg)</td>
            <td className='border-b border-b-blue-gray-200 p-2 font-bold text-base'>59.1 (43.9 ~ 59.5)</td>
          </tr>
        </tbody>
      </table> 
    </div>
  )
}

const MuscleFatAnalyzis = ({exam}) => {
  const { weight, muscle, bf} = exampleFull.results[exampleFull.results.length-1];
  const bgKG = ((bf * weight) / 100) * 10;

  const deltaWeight = () => {
    if (bf <= 15) return 3
    if (bf > 15 && bf <= 18.5) return 4 
    if (bf > 18.5 && bf <= 24.0) return 5
    if (bf > 24 && bf <= 28) return 5.5
    return 6;
  }

  return (
    <div className="w-full max-w-[640px]">
      <h2 className='text-lg font-semibold text-gray-800 border-b-4 border-b-gray-400'>Análise Músculo-Gordura</h2>
      <table className='w-full text-sm'>
        <thead>
          <tr className='border-b border-b-white h-8'>
            <th className='w-[120px] bg-blue-gray-100'></th>
            <th className='w-[90px] bg-blue-gray-100 border-l border-l-white'>Abaixo</th>
            <th className='w-[80px] bg-blue-gray-200 border-l border-l-white'>Normal</th>
            <th colSpan="3" className='w-[240px] bg-blue-gray-100 border-l border-l-white'>Acima</th>
          </tr>
        </thead>
        <tbody>
          <tr className='h-11'>
            <td className='bg-blue-gray-100 border-b border-b-white h-8 p-2'>Peso (kg)</td>
            <BarCell range={weightGridNumbers} value={weight.toFixed(1)} delta={deltaWeight()} />
          </tr>
          <tr className='h-11'>
            <td className='bg-blue-gray-100 border-b border-b-white p-2 leading-none'>Massa Muscular Esquelética (kg)</td>
            <BarCell range={muscleGridNumbers} value={muscle.toFixed(1)} />
          </tr>
          <tr className='h-11'>
            <td className=' bg-blue-gray-100 border-b border-b-gray p-2 leading-none'>Massa de Gordura (kg)</td>
            <BarCell range={fatGridNumbers} value={bgKG.toFixed(1)} delta={.9} /> 
          </tr>
        </tbody>
      </table> 
    </div>
  )
}

const FatAnalyzis = ({exam}) => {
  const { weight, height, bf} = exampleFull.results[exampleFull.results.length-1];
  const imc = weight / ((height / 100) ** 2);
  
  const deltaImc = () => {
    if (imc <= 15) return 3
    if (imc > 15 && imc <= 18.5) return 4.5
    if (imc > 18.5 && imc <= 21.5) return 5.2
    if (imc > 21.5 && imc <= 25.0) return 6.2
    return 6.5;
  }

  const deltaBf = () => {
    if (bf <= 15) return 3
    if (bf > 15 && bf <= 18.5) return 4 
    if (bf > 18.5 && bf <= 24.0) return 5
    if (bf > 24 && bf <= 28) return 5.5
    return 6;
  }

  return (
    <div className="w-full max-w-[640px]">
      <h2 className='text-lg font-semibold text-gray-800 border-b-4 border-b-gray-400'>Análise de Obesidade</h2>
      <table className='w-full text-sm'>
        <thead>
          <tr className='border-b border-b-white h-8'>
            <th className='w-[120px] bg-blue-gray-100'></th>
            <th className='w-[90px] bg-blue-gray-100 border-l border-l-white'>Abaixo</th>
            <th className='w-[80px] bg-blue-gray-200 border-l border-l-white'>Normal</th>
            <th colSpan="3" className='w-[240px] bg-blue-gray-100 border-l border-l-white'>Acima</th>
          </tr>
        </thead>
        <tbody>
          <tr className='h-11'>
            <td className='bg-blue-gray-100 border-b border-b-white h-8 p-2'>IMC (kg/m²)</td>
            <BarCell range={imcGridNumbers} value={imc.toFixed(1)} delta={deltaImc()} />
          </tr>
          <tr className='h-11'>
            <td className='bg-blue-gray-100 border-b border-b-white p-2 leading-none'>PGC (%)</td>
            <BarCell range={pgcGridNumbers} value={bf} delta={deltaBf()} />
          </tr>
        </tbody>
      </table> 
    </div>
  )
}

const BodyCompositionHistoric = ({exam}) => {

  const { weight, date, muscle, bf } = {
    date: exampleFull.results.map(res => formatDate(res.date)),
    weight: exampleFull.results.map(res => res.weight),
    muscle: exampleFull.results.map(res => res.muscle),
    bf: exampleFull.results.map(res => res.bf),
  }

  return (
    <div className="w-full max-w-[640px]">
      <h2 className='text-lg font-semibold text-gray-800 border-b-4 border-b-gray-400'>Histórico da Composição Corporal</h2>
      <table className='w-full text-sm'>
        <tbody>
          <tr className='h-11'>
            <td className='bg-blue-gray-100 border-b border-b-white h-8 p-2 w-[120px]'>Peso (kg)</td>
            <LineCell data={weight} categories={date} />
          </tr>
          <tr className='h-11'>
            <td className='bg-blue-gray-100 border-b border-b-white p-2 leading-none w-[120px]'>Massa Muscular Esquelética (kg)</td>
            <LineCell data={muscle} categories={date}/>
          </tr>
          <tr className='h-11'>
            <td className='bg-blue-gray-100 border-b border-b-white p-2 leading-none w-[120px]'>PGC (%)</td>
            <LineCell data={bf} categories={date}/>
          </tr>
        </tbody>
      </table> 
    </div>
  )
}

export const formatDateTime = (date) => {
  return format(new Date(date), "dd/MM/yyyy hh:mm", {locale : pt})
}

export const formatDate = (date) => {
  return format(new Date(date), "dd/MMM", {locale : pt})
}

const BarCell = ({range, value, delta}) => {
  const calcWidthBasedOnValue = () => {
    const width = value * delta;
    return width + 'px';
  }

  return (
    <td colSpan="3" className='border-b border-b-blue-gray-200 px-2 font-bold text-base relative'>
      <ul className='table-grid text-[11px] w-full text-gray-700 absolute -top-[1px]'>
        {range.map(number => (<li key={number} className='upperline'>{number}</li>))}
        <li className='-ml-[15px]'>%</li>
      </ul>
      <div className='flex justify-start items-center pt-[13px]'>
        <div className={`flex rounded h-2 bg-gray-900`} style={{width: calcWidthBasedOnValue()}}/>
        <span className='ml-2 text-gray-900'>{value}</span>
      </div>
    </td>
  )
}

const LineCell = ({data, categories}) => {
  const dailySalesChart = {
    type: "line",
    height: 100,
    series: [
      {
        data,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: true,
      },
      grid: {
        show: false,
        padding: {
          top: 0,
          right: 0,
          left: 20,
          bottom: -12,
        },
      },
      colors: ['#0f172a'],
      yaxis: {
        show: false,
      },
      xaxis: {
        show: false,
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#000",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 600,
            padding: 10
          },
        }, 
        categories,
      },
    }
  }

  return (
    <td colSpan="3" className='border-b border-b-blue-gray-200 px-2 font-bold text-base relative'>
      <Chart
        className="max-h-20 min-w-0"
        color="blue"
        {...dailySalesChart}
      />
    </td>
  )
}

const InbodyPoints = ({exam}) => {
  return (
    <section className='border-t-4 border-t-gray-400 py-4'>
      <h2 className='text-lg font-semibold text-gray-800 line'>Pontuação InBody</h2>
      <div className="text-center">
        <span className='text-5xl font-semibold'>68</span>
        <span className='text-2xl'>/100</span>
        <span className='text-xs ml-2'>Pontos</span>
      </div>
      <p className='text-xs'>* Pontuação total, que reflete a avaliação da composição corporal.
        Uma pessoa musculisa pode marcar mais de 100 pontos.</p>
    </section>
  )
}

const WeightControl = ({exam}) => {
  return (
    <section>
      <h2 className='text-lg font-semibold text-gray-800 line'>Controle de Peso</h2>
      <table className='w-full text-gray-800'>
        <tbody className='text-sm'>
          <tr>
            <td className=''>Peso Ideal</td>
            <td className=''>51.7 kg</td>
          </tr>
          <tr>
            <td className=''>Controle de Peso</td>
            <td className=''>-7.4kg</td>
          </tr>
          <tr>
            <td className=''>Controle de Gordura</td>
            <td className=''>-9.9kg</td>
          </tr>
          <tr>
            <td className=''>Controle Muscular</td>
            <td className=''>+2.5kg</td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}

const ResultInfo = () => {
  return (
    <section>
      <h2 className='text-lg font-semibold text-gray-800 line'>Intepretação de Resultados</h2>
      <div className='flex flex-col gap-2'>
        <div>
          <h3 className="font-bold text-sm">Análise da Composição Corporal</h3>
          <p className="text-sm">O peso do corpo é a soma da Água Corporal Total, proteínas, sais minerais e massa de gordura. 
            Mantém uma composição balanceada do corpo para permanecer saudável.</p>
        </div>
        <div>
          <h3 className="font-bold text-sm">Análise Músculo-Gordura</h3>
          <p className="text-sm">Compara os comprimentos de barras de massa muscular esquelética e massa de gordura.
            Quanto maior a barra da massa muscula esquelética é comparada com a barra de massa de gordura coportal, mais forte o corpo é.</p>
        </div>
        <div>
          <h3 className="font-bold text-sm">Análise de Obesidade</h3>
          <p className="text-sm">O IMC é um índice utilizado para determinar a obesidade, através da altura e peso.
            PGC é o percentual de gordura corporal em relação ao peso corporal.</p>
        </div>
        {/* <div>
          <h3 className="font-bold text-sm">Análise da Massa Magra Segmentar</h3>
          <p className="text-sm">Avaliar se a quantidade de músculo é distribuído de forma adequada em todas as partes do corpo.
            Compara a massa muscular com o peso ideal.</p>
        </div> */}
        {/* <div>
          <h3 className="font-bold text-sm">Análise da Gordura Segmentar</h3>
          <p className="text-sm">Avalia se a quantidade de gordura é distribuida de maneira adequada em todas as partes do corpo.
            Compara a massa gorda ao peso ideal. </p>
        </div> */}
      </div>
    </section>
  )
}

export default Result;