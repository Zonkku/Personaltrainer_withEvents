import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css'


function TrainingCalendar() {

    const localizer = momentLocalizer(moment);
    const [trainings, setTrainings] = useState([]);
    const [trainingEvent, setTrainingEvent] = useState({
        id: 0,
        title: '',
        allday: true,
        start: Date,
        end: Date
    });

    const [trainingEvents, setTrainingEvents] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => [
        fetch ('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => {
            setTrainings(data)
            trainingsToEvents()
        })
      .catch(err => console.err(err))
    ]

    const trainingsToEvents = () => {

        trainingEvents = trainings.map( (training) => 
        
            setTrainingEvent({
                key: trainings.id,    
                id: trainings.id,
                title: trainings.activity,
                allday: true,
                start: new Date(trainings.date),
                end: new Date(trainings.date)

          })
        )
    }

    

    return (
        <div>
                <div>
                    <Calendar
                        localizer={localizer}
                        events={trainingEvents}
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

