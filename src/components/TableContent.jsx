import React from 'react'
import { Route } from 'react-router-dom';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';

import { fetchData, changeCurrentPage } from '../redux/actions/tableData'
import { 
  TableHeaders,
  TableNav, 
  LoadingRows, 
  SelectedData, 
  AddNewData, 
  DataHeader 
} from './index'

import { Table, Container } from 'semantic-ui-react'

function TableContent ({ dataValue, search }) {
  const dispatch = useDispatch();
  const scrollBottom = React.useRef();

  const [isItSearch, setIsItSearch] = React.useState(search);
  const [selectedSort, setSelectedSort] = React.useState('id');
  const [selectedOrder, setSelectedOrder] = React.useState('desc');
  const [selectedDataRow, setSelectedDataRow] = React.useState();
  
  const setSearch = (e) => {
    setIsItSearch(e);
  }

  const { currentPage } = useSelector( (data) => data);

  React.useEffect(() => {
    dispatch(fetchData( dataValue, selectedOrder, selectedSort, isItSearch ));
  }, [ dataValue, selectedOrder, selectedSort, isItSearch, dispatch, currentPage ]);

  const { data, maxPages, isLoaded } = useSelector( (data) => data);

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
  }

  const changePage = (bool) => {
    dispatch(changeCurrentPage(bool));
  }
  
  const selectDataRow = (item) => {
    setSelectedDataRow(item);
    scrollBottom.current.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
  }

  const postData = (data) => {
    axios.post(`/${dataValue}Data/`, {
      id: +data.id,
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
        <DataHeader setIsItSearch={(e) => setSearch(e)}/>

        <Table sortable={true} celled>
          <TableHeaders 
            changeSort={(name) => changeSort(name)}
            selectedOrder={selectedOrder}
            selectedSort={selectedSort}
          />

          <Table.Body>
            {
            isLoaded ? data.map( (item, index) => 
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
              <LoadingRows />            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            }
          </Table.Body>

          <TableNav 
            changePage={(bool) => changePage(bool)}
            maxPages={maxPages}
            currentPage={currentPage} 
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
