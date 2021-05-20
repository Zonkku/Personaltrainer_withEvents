import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css'


function TrainingCalendar() {

    const localizer = momentLocalizer(moment);
    const [trainings, setTrainings] = useState([]);
        
   
    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => [
        fetch ('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => {
            setTrainings(data)
        })
      .catch(err => console.err(err))
    ]

    const myEventsList = [
        {
            id: trainings.id,
            title: trainings.activity,
            allDay: true,
            start: trainings.date,
            end: trainings.date    
        }





    ]



    return (
        <div>
                <div>
                    <Calendar
                        localizer={localizer}
                        events={myEventsList}
                        startAccessor="start"
                        endAccessor="end"
                        defaultDate={moment().toDate()}
                        style={{ height: 500 }}
                    />
                </div>
        </div>
  );


}

export default TrainingCalendar;

