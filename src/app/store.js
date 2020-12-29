import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "../features/table/tableSlice";
import detailsReducer from "../features/table/detailsSlice";

export default configureStore({
  reducer: {
    table: tableReducer,
    details: detailsReducer,
  },
});
