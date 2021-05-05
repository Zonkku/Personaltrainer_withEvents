import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';


function ListTrainings() {

    const [trainings, setTrainings] = useState([]);


    useEffect(() => {
      fetchTrainings();
    }, []);
  
    const fetchTrainings = () => [
      fetch ('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => setTrainings(data))
      .catch(err => console.err(err))
    ]
  
    const columns = [
        { 
          field: "date", 
          sortable: true, 
          filter: true,
          valueFormatter : params => moment().format(params.value) 

        },
        { field: "duration", sortable: true, filter: true },
        { field: "activity", sortable: true, filter: true },
        { headerName: "Customer", field: "customer.lastname",  sortable: true, filter: true}
  
    ]

    return (
      <div>
        <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto' }}>
        <AgGridReact
          rowData={trainings}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={8}
          suppressCellSelecttion={true}

        /></div>
      </div>


    );
    
}

export default ListTrainings;