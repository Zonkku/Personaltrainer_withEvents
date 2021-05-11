import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import AddCustomer from './subcomponents/AddCustomer';
import Snackbar from '@material-ui/core/Snackbar';

function ListCustomers() {

    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);

    const openSnackbar = () => {
      setOpen(true);
    }
  
    const closeSnackbar = () => {
      setOpen(false);
    }

    useEffect(() => {
      fetchCustomers();
    }, []);
  
    const fetchCustomers = () => [
      fetch ('https://customerrest.herokuapp.com/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data.content))
      .catch(err => console.err(err))

    ]

    const deleteCustomer = (url) => {
      if (window.confirm('Are you sure?')) {
        fetch(url, {method: 'DELETE'})
        .then(response => {
          if(response.ok) {
            openSnackbar();
            fetchCustomers();
          }
          else {
            alert('Something went wrong');
          }
        })
        .catch(err => console.error(err))
      }
    }

    const addCustomer = (newCustomer) => {
      fetch('https://customerrest.herokuapp.com/api/customers', {
        method: 'POST',
        body: JSON.stringify(newCustomer),
        headers: { 'Content-type' : 'application/json' }
      })
      .then(response => {
        if(response.ok)
          fetchCustomers();
        else
          alert('Something went wrong');
      })
      .catch(err => console.error(err))
    }
    
  
    const columns = [
      { headerName: "First name", field: "firstname", sortable: true, filter: true },
      { headerName: "Last name", field: "lastname", sortable: true, filter: true },
      { field: "email", sortable: true, filter: true },
      { field: "phone", sortable: true, filter: true },
      { headerName: "Address", field: "streetaddress", sortable: true, filter: true },
      { field: "postcode", sortable: true, filter: true },
      { field: "city", sortable: true, filter: true },
      { headerName: '',
        field:'links.href',
        width: 100,
        cellRendererFramework: params => 
        <IconButton color="secondary" onClick={() => deleteCustomer(params.value)}>
          <DeleteIcon /> 
        </IconButton> 
      }

    ]

    return (
      <div>
        <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto' }}>
        <h1>Customers</h1>
        <AddCustomer addCustomer={addCustomer}/>
        <AgGridReact
          rowData={customers}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={8}
          suppressCellSelecttion={true}
        /></div>
        <Snackbar
          open={open}
          message="Customer deleted"
          autoHideDuration={3000}
          onClose={closeSnackbar}
        />
      </div>
    );
}

export default ListCustomers;