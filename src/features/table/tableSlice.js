import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDetailsById = createAsyncThunk(
  "details/fetchById",
  async (itemId, { dispatch }) => {
    dispatch(updateSeen(itemId));

    // const response = await axios.post(
    //   `https://xivapi.com/Achievement/${itemId}`
    // );
    const response = await axios.get(`https://reqres.in/api/users/${itemId}`);

    // Let's not crash the API
    await new Promise((resolve) => setTimeout(resolve, 125));

    // let { Icon, Name, Description } = response.data;
    let { avatar, email, first_name, last_name } = response.data.data;

    const icon = avatar;
    const description = `${first_name} ${last_name}
${email}
 
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer purus justo, dignissim ut efficitur sit amet, mollis quis libero. Vivamus quis magna volutpat, commodo elit id, aliquet massa. Quisque congue felis eget diam ultricies, ultricies suscipit felis aliquam. Integer ullamcorper volutpat semper. Curabitur a mauris ornare, facilisis odio eget, mollis elit. Nam molestie erat ac quam scelerisque iaculis. Quisque ac felis auctor, viverra orci eget, dignissim metus.
`;

    return {
      id: itemId,
      icon,
      description,
    };
  }
);

const tableSlice = createSlice({
  name: "table",
  initialState: {
    // We keep an LRU cache of recently viewed items so that we don't keep hitting the API server.
    maxSaved: 100,

    // Item IDs are used as entries in `recentItems` and keys for `itemDetails`.
    recentItems: [],
    itemDetails: {},

    // Row IDs are used as keys for `openPanels`.
    openPanels: {},
  },
  reducers: {
    changePage: (state) => {
      // When the page changes, any open detail panels are closed.
      state.openPanels = {};
    },
    togglePanelState: (state, action) => {
      // We keep our own records of which panels are open so that we can initialise/close them programmatically.
      const rowId = action.payload;
      if (state.openPanels[rowId]) {
        delete state.openPanels[rowId];
      } else {
        state.openPanels[rowId] = true;
      }
    },
    updateSeen: (state, action) => {
      // Registers a hit against the LRU cache for the given item, and prunes the cache if necessary.
      const itemId = action.payload;

      // Update ...
      const seenIdx = state.recentItems.indexOf(itemId);
      if (seenIdx > -1) {
        state.recentItems.splice(seenIdx, 1);
      }
      state.recentItems.push(itemId);

      // ... and prune
      while (state.recentItems.length > state.maxSaved) {
        const removeId = state.recentItems.shift();
        delete state.itemDetails[removeId];
      }
    },
  },
  extraReducers: {
    [fetchDetailsById.pending]: (state, action) => {
      const id = action.meta.arg;
      state.itemDetails[id] = {
        status: "Pending",
      };
    },
    [fetchDetailsById.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.itemDetails[id] = { status: "Cached", ...action.payload };
    },
  },
});

export const { changePage, togglePanelState, updateSeen } = tableSlice.actions;

export default tableSlice.reducer;
