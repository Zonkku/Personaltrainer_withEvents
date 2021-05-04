import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



function ListCustomers() {

    const [customers, setCustomers] = useState([]);


    useEffect(() => {
      fetchCustomers();
    
    }, []);
  
    const fetchCustomers = () => [
      fetch ('https://customerrest.herokuapp.com/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data.content))
      .catch(err => console.err(err))
    ]
  
    const columns = [
      { field: "firstname", sortable: true, filter: true },
      { field: "lastname", sortable: true, filter: true },
      { field: "streetaddress", sortable: true, filter: true },
      { field: "postcode", sortable: true, filter: true },
      { field: "city", sortable: true, filter: true },
      { field: "email", sortable: true, filter: true },
      { field: "phone", sortable: true, filter: true },
      
    ]
  


    return (
      <div>
        <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto' }}>
        <AgGridReact
          rowData={customers}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={8}
          suppressCellSelecttion={true}

        /></div>
      </div>


    );
    
}

export default ListCustomers;