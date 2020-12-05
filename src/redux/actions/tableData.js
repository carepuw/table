import axios from 'axios'

export const fetchData = (dataValue, selectedOrder, selectedSort, isItSearch) => (dispatch) => {
  dispatch({
    type: 'SET_LOADING',
    payload: false,
  });
  isItSearch ?
  axios.get(`/${dataValue}Data?${isItSearch.choosenSearch.value}=${isItSearch.inputsValue}`)
      .then ( ({ data }) => {
        dispatch(setData(data));
      })
  :
  axios.get(`/${dataValue}Data?_sort=${selectedSort === 'address' ? 'address.city' : `${selectedSort}`}&_order=${selectedOrder}`)
    .then(({ data }) => {
      dispatch(setData(data));
    })
}

export const changeCurrentPage = (bool) => ({
  type: 'CHANGE_PAGE',
  payload: bool,
});

export const setData = (obj) => ({
  type: 'UPLOAD_TABLE_DATA',
  payload: obj,
})

export const clearData = () => ({
  type: 'CLEAR_DATA',
})