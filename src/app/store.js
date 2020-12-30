import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "../features/table/tableSlice";
import debugReducer from "../features/debug/debugSlice";

export default configureStore({
  reducer: {
    table: tableReducer,
    debug: debugReducer,
  },
});
