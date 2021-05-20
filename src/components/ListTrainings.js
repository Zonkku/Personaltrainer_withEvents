import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function ListTrainings() {

    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    const openSnackbar = () => {
      setOpen(true);
    }
  
    const closeSnackbar = () => {
      setOpen(false);
    }

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
        fetch('https://customerrest.herokuapp.com/api/trainings/' + id, {method: 'DELETE'})
        .then(response => {
          if(response.ok) {
            setMsg('Training deleted');
            openSnackbar();
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
      { headerName: '',
        field:"id",
        width: 100,
        cellRendererFramework: params => 
        <IconButton color="secondary" onClick={() => deleteTraining(params.value)}>
          <DeleteIcon /> 
        </IconButton> 
      },
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
          paginationPageSize={5}
          suppressCellSelecttion={true}
          
        /></div>
        <Snackbar
          open={open}
          message={msg}
          autoHideDuration={3000}
          onClose={closeSnackbar}
        />
      </div>
    );   
}

export default ListTrainings;