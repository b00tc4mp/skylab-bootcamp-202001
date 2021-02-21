import React, { useState, useContext } from 'react'
import MaterialTable from 'material-table'
import Icon from '@material-ui/core/Icon';
import FullDialog from './FullDialog'
import Payment from '../containers/Payment'
import { Context } from '../containers/ContextProvider'

const padding = 'dense'
const pageSize = 15

export default function MaterialTableDemo({ setUpdate, onRowAdd, title, data, columns, registerUser, actions }) {
  const { token } = useContext(Context)

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
        title === 'Créditos' && rowData &&
        <Payment credit={rowData} open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} />
      }
      {
        title === 'Clientes' &&
        <FullDialog user={rowData} open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} />
      }

      <MaterialTable
        title={window.innerWidth < 460 ? '' : title}
        columns={columns}
        data={data}
        editable={
          onRowAdd && {
            onRowAdd: newData => {
              return new Promise((resolve, reject) => resolve())
                .then(() => registerUser({ ...newData, token }))
                .then(() => setUpdate(update => !update))
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
          pageSizeOptions: [5, 10, 15, 20, data.length],
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

