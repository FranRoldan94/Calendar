import React, { useEffect, useState } from 'react'
import { getMonthMatrix } from '../../utils/calendarDay'
import Day from '../components/Day/Day.component'
import { useStore } from '../store/calendar.store';
import { Locale } from 'date-fns';

interface MonthViewProps { 
    renderDayType?: React.ReactNode
    locale?: Locale
}

const MonthView: React.FC<MonthViewProps> = ({renderDayType, locale}) => {
    const [currentMonth, setCurrentMonth] = useState<Date[][]>(getMonthMatrix());

    const { monthIndex } = useStore((state) => ({
      monthIndex: state.monthIndex,
    }));
  
    useEffect(() => {
      setCurrentMonth(getMonthMatrix(monthIndex));
    }, [monthIndex]);
    return (
        <div className='grid grid-cols-7 grid-rows-5 w-full'>
            {currentMonth.map((week, index) => {
                return (
                    <React.Fragment key={index}>
                    {week.map((day, idx) => {
                        return <Day key={idx} day={day} rowIdx={index} renderDayType={renderDayType} locale={locale} />
                    })}
                    </React.Fragment>
                )
            })}
        </div>
    )
}

export default MonthView