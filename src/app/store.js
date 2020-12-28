import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "../features/table/tableSlice";

export default configureStore({
  reducer: {
    table: tableReducer,
  },
});
