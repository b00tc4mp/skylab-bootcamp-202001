import React, { useState } from 'react'
import MaterialTable from 'material-table'
import Icon from '@material-ui/core/Icon';
import FullDialog from './FullDialog'
import Payment from './Payment'

const padding = 'dense'
const pageSize = 10

export default function MaterialTableDemo({onRowAdd, father, data, setData, columns, registerUser, actions }) {

  const [row, setRow] = useState(null)
  const [open, setOpen] = useState(false)
  const [rowData, setRowData] = useState()

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleRowData = (event, data) => {
    setRowData(data)
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

  return (
    <>
      {
        father === 'credits' && rowData &&
        <Payment credit={rowData} open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} />
      }
      {
        father === 'customers' &&
        <FullDialog user={rowData} open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} />
      }

      <MaterialTable
        title={window.innerWidth < 460 ? '' : 'Clientes'}
        columns={columns}
        data={data}
        editable={
          onRowAdd && {
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

        onRowClick={((event, selectedRow) => {
          setRow(selectedRow)
        })}

        options={{
          addRowPosition: 'first',
          rowStyle: rowData => ({
            color: (row && row.tableData.id === rowData.tableData.id) ? 'Black' : 'black',

            backgroundColor: (row && row.tableData.id === rowData.tableData.id) ? '#eee'
              : ((rowData.tableData.id % 2) ? 'white' : 'white')
          }),
          emptyRowsWhenPaging: false,
          padding,
          pageSize,
          pageSizeOptions: [...pageSizeOptions, data.length],
          detailPanelColumnAlignment: 'left',
          actionsColumnIndex: -1
        }}
        actions={
          actions.map(action => {
            if (action === 'add_circle') {
              return {
                icon: () => <Icon style={{ color: 'green' }}>{action}</Icon>,
                onClick: handleRowData,
              }
            }
            // if (action === 'add_circle' && father === 'credits') {
            //   return {
            //     icon: () => <Icon style={{ color: 'green' }}>{action}</Icon>,
            //     onClick: handleAddPayment,
            //   }
            // }
            if (action === 'editable') {
              return {
                icon: () => <Icon style={{ color: '#3F50B5' }}>{action}</Icon>,
                onClick: (event, rowData) => alert("You want to delete " + rowData.name),
              }
            }
          })
        }
      />
    </>
  )
}

