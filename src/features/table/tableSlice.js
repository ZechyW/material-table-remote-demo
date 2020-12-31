import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Dispatch a request for a given item from the API server.
export const fetchDetailsById = createAsyncThunk(
  "details/fetchById",
  async (itemId) => {
    // const response = await axios.post(
    //   `https://xivapi.com/Achievement/${itemId}`
    // );
    const response = await axios.get(`https://reqres.in/api/users/${itemId}`);

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
    // Item IDs are used as entries in `recentItems` and keys for `items`.
    maxSaved: 100,
    recentItems: [],
    items: {},

    // Similarly, we limit the number of open detail panels at once to avoid clutter.
    // If `maxOpenPanels` is larger than `maxSaved`, up to `maxSaved` panels will be open at once.
    // (Items dropped from the LRU cache will have their panels closed automatically.)
    // Row IDs are used as keys for `openPanels`.
    maxOpenPanels: 1,
    openPanels: [],
  },
  reducers: {
    // Panel management
    // ----------------
    changePage: (state) => {
      // When the page changes, any open detail panels are closed.
      state.openPanels = [];
    },
    setPanelStateOpen: (state, action) => {
      // Material-table's detail panel toggling is imperative --
      // We keep our own records of which panels are open so that we can initialise/close them programmatically.
      const rowId = action.payload;

      // Hit
      const openPanelsIdx = state.openPanels.indexOf(rowId);
      if (openPanelsIdx > -1) {
        state.openPanels.splice(openPanelsIdx, 1);
      }
      state.openPanels.push(rowId);

      // Prune
      while (state.openPanels.length > state.maxOpenPanels) {
        state.openPanels.shift();
      }
    },
    setPanelStateClosed: (state, action) => {
      const rowId = action.payload;
      const openPanelsIdx = state.openPanels.indexOf(rowId);
      if (openPanelsIdx > -1) {
        state.openPanels.splice(openPanelsIdx, 1);
      }
    },

    // Item management
    // ---------------
    registerItemHit: (state, action) => {
      // Registers a hit against the LRU cache for the given item, and prunes the cache if necessary.
      const itemId = action.payload;

      // Hit ...
      const seenIdx = state.recentItems.indexOf(itemId);
      if (seenIdx > -1) {
        state.recentItems.splice(seenIdx, 1);
      }
      state.recentItems.push(itemId);

      // ... and prune
      while (state.recentItems.length > state.maxSaved) {
        const removeId = state.recentItems.shift();
        delete state.items[removeId];
      }
    },
  },
  extraReducers: {
    // Item retrieval
    // --------------
    [fetchDetailsById.pending]: (state, action) => {
      const id = action.meta.arg;
      state.items[id] = {
        status: "Pending",
        ...state.items[id],
      };
    },
    [fetchDetailsById.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.items[id] = { status: "Cached", ...action.payload };
    },
  },
});

export const {
  changePage,
  setPanelStateOpen,
  setPanelStateClosed,
  registerItemHit,
} = tableSlice.actions;

export default tableSlice.reducer;
