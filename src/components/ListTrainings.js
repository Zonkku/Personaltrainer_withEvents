import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


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

    const deleteTraining = (id) => {
      if (window.confirm('Are you sure?')) {
        fetch('https://customerrest.herokuapp.com/api/trainings' + id, {method: 'DELETE'})
        .then(response => {
          if(response.ok) {
            fetchTrainings();
          }
          else {
            alert('Something went wrong');
          }
        })
        .catch(err => console.error(err))
      }
    }
  
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
        { headerName: "", field: "customer.firstname",  sortable: true, filter: true},
        { headerName: '',
        field:"id",
        width: 100,
        cellRendererFramework: params => 
        <IconButton color="secondary" onClick={() => deleteTraining(params.value)}>
          <DeleteIcon /> 
        </IconButton> 
      }
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