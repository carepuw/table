const initialState = {
  data: undefined,
  currentPage: 1,
  maxPages: 1,
  isLoaded: false,
};

const table = (state = initialState, action) => {
  switch (action.type) {
    case 'UPLOAD_TABLE_DATA':
      let max = 1;
      if ((action.payload.length / 50 > 1) && (action.payload.length % 50 !== 0)) {
        max = action.payload.length / 50 + 1;
      } else {
        if (action.payload.length % 50 === 0) {
          max = action.payload.length / 50
        }
      }
      const start = (50 * state.currentPage - 50);
      const sortedData = action.payload.splice(start,50);

      return {
        ...state,
        data: [...sortedData],
        currentPage: state.currentPage,
        maxPages: max,
        isLoaded: true,
      }

    case 'CHANGE_PAGE':
      let curPage = state.currentPage;
      action.payload ? curPage++ : curPage--;
      return {
        ...state,
        currentPage: curPage,
      }
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoaded: false,
      }

    case 'CLEAR_DATA':
      return{
        ...state,
        currentPage: 1,
      }

    default:
      return state
  }
}

export default table;