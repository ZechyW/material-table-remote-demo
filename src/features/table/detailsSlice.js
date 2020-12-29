/**
 * Keeps a cache of recently viewed details so we don't have to keep hitting the API server.
 */
import { createSlice } from "@reduxjs/toolkit";

export const detailsSlice = createSlice({
  name: "details",
  initialState: {
    maxSaved: 1,
    seenIds: [],
    items: {},
  },
  reducers: {
    /**
     * Save the details for the given record.
     * @param state
     * @param action
     */
    saveDetails: (state, action) => {
      const { ID, Icon, Name, Description } = action.payload;
      state.items[ID] = { Icon, Name, Description };
    },
    /**
     * Registers a hit against the LRU cache for the given ID, and prunes the cache if necessary.
     * @param state
     * @param action
     */
    updateSeen: (state, action) => {
      const { ID } = action.payload;

      // Update ...
      const seenIdx = state.seenIds.indexOf(ID);
      if (seenIdx > -1) {
        state.seenIds.splice(seenIdx, 1);
      }
      state.seenIds.push(ID);

      // ... and prune
      while (state.seenIds.length > state.maxSaved) {
        const removeId = state.seenIds.shift();
        // We keep a little trace of the original so that the table component can close the associated details panel if
        // it happens to be open.
        state.items[removeId] = "Dropped";
      }
    },
  },
});

export const { saveDetails, updateSeen } = detailsSlice.actions;

export default detailsSlice.reducer;
