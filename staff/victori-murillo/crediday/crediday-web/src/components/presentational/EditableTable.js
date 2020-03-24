import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import axios from 'axios'
import Icon from '@material-ui/core/Icon';
import { green } from '@material-ui/core/colors';

import Modal from './Modal'
import FullDialog from './FullDialog'
const API_URL = process.env.REACT_APP_API_URL

const padding = 'dense'
const pageSize = 10

export default function MaterialTableDemo({ data, setData, columns, registerUser }) {

  const [row, setRow] = useState(null)
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState()
  const [credits, setCredits] = useState([])

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleAddCredit = (event, data) => {
    setUser(data)
    handleClickOpen()
  }

  const pageSizeOptions = []

  if (data) {
    for (let index = 1; index < data.length; index++) {
      if (index && Number.isInteger(index / pageSize)) {
        pageSizeOptions.push(index)
      }
    }
  }

  const fetchCredits = (id) => {
    return axios.get(`${API_URL}/credits/user/${id}`, { headers: { Authorization: `Bearer ${sessionStorage.session}` } })
  }
  console.log(data)

  return (
    <>
      <FullDialog user={user} open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} />

      <MaterialTable
        title={window.innerWidth < 460 ? '' : 'Clientes'}
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData => {
            return new Promise((resolve, reject) => resolve())
              .then(() => registerUser(newData))
              .then(() => {
                window.location.reload()
                // setData([...data, newData])
              })
              .catch(e => {
                console.log(e.message)
              })
          }
        }}

        // onRowClick={((event, selectedRow) => {
        //   setRow(selectedRow)
        // })}

        options={{
          addRowPosition: 'first',
          rowStyle: rowData => ({
            color: (row && row.tableData.id === rowData.tableData.id) ? 'white' : 'black',

            backgroundColor: (row && row.tableData.id === rowData.tableData.id) ? '#3F50B5'
              : ((rowData.tableData.id % 2) ? 'white' : 'white')
          }),
          emptyRowsWhenPaging: false,
          padding,
          pageSize,
          pageSizeOptions: [...pageSizeOptions, data.length],
          // columnsButton: true,
          detailPanelColumnAlignment: 'left',
          actionsColumnIndex: -1
        }}
        actions={[
          {
            icon: () => <Icon style={{ color: 'green' }}>add_circle</Icon>,
            onClick: handleAddCredit,
          },
          {
            icon: () => <Icon style={{ color: '#3F50B5' }}>editable</Icon>,
            onClick: (event, rowData) => alert("You want to delete " + rowData.name),
          }
        ]}

        // detailPanel={[
        //   {
        //     render: (rowData) => {
        //       return (
        //         <div
        //           onClick={() => console.log('show credits')}
        //           style={{
        //             fontSize: 20,
        //             textAlign: 'center',
        //             color: 'white',
        //             backgroundColor: '#43A047',
        //           }}
        //         >

        //         </div>
        //       )
        //     },
        //   }
        // ]}
      />
    </>
  )
}

