import Header from '@/components/Header';
import React, { useState } from 'react';
import Image from 'next/image';
import CRISAO from '../assets/crisao.png'
import WeatherComponent from '@/components/WeatherComponent';

const Calendar = () => {
  const apiKey = '0e9c5e5e4b7d5aa5f6eb48bd40dd6031'; // Substitua pela sua chave de API

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getDaysInMonth = (year: any, month: any) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: any, month: any) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateClick = (day: any) => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day));
  };

  const renderCalendar = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const blanks = Array(firstDayOfMonth).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const preSelectedDates:any = { 18: true}; // Adicione as datas desejadas

    return (
      <div className="grid bg-white grid-cols-7 gap-1">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center font-bold text-gray-700">
            {day}
          </div>
        ))}
        {blanks.map((_, index) => (
          <div key={`blank-${index}`} />
        ))}
        {days.map((day) => (
          <div
            key={day}
            className={`text-center p-2 cursor-pointer ${
              selectedDate.getDate() === day ? 'bg-blue-500 text-white' : ''
            } ${preSelectedDates[day] ? 'bg-yellow-300' : ''}`}
            onClick={() => handleDateClick(day)}
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='flex flex-col'>
      <Header />
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() =>
              setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))
            }
          >
            Mês anterior
          </button>
          <div className="font-bold text-lg">
            {new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(
              selectedDate
            )}
          </div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() =>
              setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))
            }
          >
            Próximo mês
          </button>
        </div>
        {renderCalendar()}
      </div>
      
      <div className='flex justify-start mx-5'>
        <WeatherComponent city="london" apiKey={apiKey} />
        <Image src={CRISAO} alt='' height={300}/>
      </div>
    </div>
  );
};

export default Calendar;
