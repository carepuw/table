const initialState = {
  data: [],
  currentPage: 1,
};

const table = (state = initialState, action) => {
  switch (action.type) {
    case 'UPLOAD_TABLE_DATA':
      return {
        ...state,
        data: [...action.payload],
        currentPage: 1,
      }
  
    default:
      return state
  }
}

export default table;