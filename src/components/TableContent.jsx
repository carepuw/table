import React from 'react'
import { Route } from 'react-router-dom';
import axios from 'axios'

import { 
  TableHeaders,
  TableNav, 
  LoadingRows, 
  SelectedData, 
  AddNewData, 
  DataHeader 
} from './index'

import { Table, Container } from 'semantic-ui-react'

function TableContent({dataValue, search}) {
  const [data, setData] = React.useState();
  const [isItSearch, setIsItSearch] = React.useState(search);
  const [selectedSort, setSelectedSort] = React.useState('id');
  const [selectedOrder, setSelectedOrder] = React.useState('desc');
  const [currentPage, setCurrentPage] = React.useState(window.location.pathname.slice(1));
  const [maxPages, setMaxPages] = React.useState();
  const [selectedDataRow, setSelectedDataRow] = React.useState();
  const scrollBottom = React.useRef();

  const setSearch = (e) => {
    setIsItSearch(e);
  }

  React.useEffect(() => {
      isItSearch ? 
      axios.get(`/${dataValue}Data?${isItSearch.choosenSearch.value}=${isItSearch.inputsValue}`)
      .then ( ({ data }) =>{
        if ((data.length / 50 > 1) && (data.length % 50 !== 0)) {
          setMaxPages(data.length / 50 + 1);
        } else {
          if (data.length % 50 === 0) {
            setMaxPages(data.length / 50)
          } else {
            setMaxPages(1)
          }
        }
        const start = (50 * currentPage - 50);
        setData(data.splice(start,50));
      })
      :
      axios.get(`/${dataValue}Data?_sort=${selectedSort === 'address' ? 'address.city' : `${selectedSort}`}&_order=${selectedOrder}`)
      .then( ({ data }) => {
        if ((data.length / 50 > 1) && (data.length % 50 !== 0)) {
          setMaxPages(data.length / 50 + 1);
        } else {
          if (data.length % 50 === 0) {
            setMaxPages(data.length / 50)
          } else {
            setMaxPages(1)
          }
        }
        const start = (50 * currentPage - 50);
        setData(data.splice(start,50));
      });
  }, [selectedSort, selectedOrder, currentPage, dataValue, isItSearch]);

  const changeSort = (name) => {
    if (name === selectedSort) {
      if (selectedOrder === 'desc') {
        setSelectedOrder('asc');
      } else {
        setSelectedOrder('desc');
      }
    } else {
      setSelectedSort(name);
      setSelectedOrder('desc');
    }
    setDataNull();
  }

  const changePage = (bool) => {
    if (bool) {
      setCurrentPage( +currentPage + 1 );
    } else {
      setCurrentPage( +currentPage - 1 );
    }
    setDataNull();
  }

  const setDataNull = () => {
    setData();
  }  
  
  const selectDataRow = (item) => {
    setSelectedDataRow(item);
    scrollBottom.current.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
  }

  const postData = (data) => {
    axios.post(`/${dataValue}Data/`, {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      address: {
        streetAddress: data.streetAddress,
        city: data.city,
        state: data.state,
        zip: data.zip
      },
      description: data.description,
    })
  }

  return (
    <Route path={`/${currentPage}`}>
      <Container className="table_container">
        <DataHeader setData={() => setDataNull()} setIsItSearch={(e) => setSearch(e)}/>

        <Table sortable={true} celled>
          <TableHeaders 
            changeSort={(name) => changeSort(name)}
            selectedOrder={selectedOrder}
            selectedSort={selectedSort}
          />

          <Table.Body>
            {
            data ? data.map( (item, index) => 
              <Table.Row key={index} className="table_row" onClick={() => selectDataRow(item)}>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.firstName}</Table.Cell>
                <Table.Cell>{item.lastName}</Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
                <Table.Cell>{item.phone}</Table.Cell>
                <Table.Cell>{item.address.city}</Table.Cell>
                <Table.Cell className="table_cell__description">{item.description}</Table.Cell>
              </Table.Row>
            ) : 
              <LoadingRows />
            }
          </Table.Body>

          <TableNav 
            changePage={(bool) => changePage(bool)}
            maxPages={+maxPages}
            currentPage={+currentPage} 
          />
        </Table>

        <AddNewData addData={(data) => postData(data)}/>

        <div className='dataCard'>
          <SelectedData selectedData={selectedDataRow}/>
        </div>
        <div ref={scrollBottom}></div>
        
      </Container>
    </Route>
  )
}

export default TableContent
