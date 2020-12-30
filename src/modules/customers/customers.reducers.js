import produce from "immer";
import * as CONSTANS from "./customers.constans";
const initialState = {
  page: 1,
  data: [],
};
export const customersReducer = (state = initialState, action) => {
  return produce(state, draftState => {
    switch (action.type) {
      case CONSTANS.GET_CUSTOMERS_PENDING:
        draftState.loading = true;
        break;
      case CONSTANS.GET_CUSTOMERS_SUCCESS: {
        draftState.numberDoc = action.payload.totalDoc;
        draftState.loading = false;
        draftState.startIndex = action.payload.startIndex;
        const convertData = action.payload.record.map(item => {
          return { ...item, index: action.payload.startIndex++ };
        });
        draftState.data = convertData;
        break;
      }
      case CONSTANS.GET_CUSTOMERS_ERROR:
        draftState.loading = false;
        break;
      case CONSTANS.CHANGE_PAGE_CUSTOMERS:
        draftState.page = action.payload;
        break;
      default:
        return state;
    }
  });
};
