import React from 'react'

import { Table } from 'semantic-ui-react'

function TableHeaders({ changeSort, selectedOrder, selectedSort }) {
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell 
          onClick={() => changeSort("id")}
          name="id" 
          sorted={selectedSort === "id" ? `${selectedOrder === 'desc' ? 'descending' : 'ascending'}` : null}
        >
          Id
        </Table.HeaderCell>
        <Table.HeaderCell
          onClick={() => changeSort("firstName")}
          name="firstName" 
          sorted={selectedSort === "firstName" ? `${selectedOrder === 'desc' ? 'descending' : 'ascending'}` : null}
        >
          First name
        </Table.HeaderCell>
        <Table.HeaderCell
          onClick={() => changeSort("lastName")}
          name="lastName" 
          sorted={selectedSort === "lastName" ? `${selectedOrder === 'desc' ? 'descending' : 'ascending'}` : null}
        >
          Last name
        </Table.HeaderCell>
        <Table.HeaderCell
          onClick={() => changeSort("email")}
          name="email" 
          sorted={selectedSort === "email" ? `${selectedOrder === 'desc' ? 'descending' : 'ascending'}` : null}
        >
          Email
        </Table.HeaderCell>
        <Table.HeaderCell
          onClick={() => changeSort("phone")}
          name="phone" 
          sorted={selectedSort === "phone" ? `${selectedOrder === 'desc' ? 'descending' : 'ascending'}` : null}
        >
          Phone
        </Table.HeaderCell>
        <Table.HeaderCell
          onClick={() => changeSort("address")}
          name="address" 
          sorted={selectedSort === "address" ? `${selectedOrder === 'desc' ? 'descending' : 'ascending'}` : null}
        >
          Address
        </Table.HeaderCell>
        <Table.HeaderCell
          onClick={() => changeSort("description")}
          name="description" 
          sorted={selectedSort === "description" ? `${selectedOrder === 'desc' ? 'descending' : 'ascending'}` : null}
        >
          Description
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  )
}

export default TableHeaders
