import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
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
      { field: "activity", sortable: true, filter: true },
      { 
          field: "date", 
          sortable: true, 
          filter: true,
          valueFormatter : params => moment(params.value).format("MMMM Do YYYY, h:mm") 
        },
        { field: "duration", sortable: true, filter: true },
        { headerName: "Customer", field: "customer.lastname",  sortable: true, filter: true},
        { headerName: "", field: "customer.firstname",  sortable: true, filter: true}
    ]

    return (
      <div>
        <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto' }}>
        <h1>Trainings</h1>
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