import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Grabs a specified page of data from the API server.
 * N.B.: This particular function is *NOT* a thunk, because `material-table` expects a simple function that returns
 * a promise when dealing with remote data.
 * We keep it here together with the main reducer logic anyway to keep the API call out of the Table component.
 * @param query
 * @returns {Promise<Object>}
 */
export const getDataPage = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      // API call
      let url = "https://reqres.in/api/users";
      url += "?per_page=" + query.pageSize;
      url += "&page=" + (query.page + 1);

      const response = await axios.get(url);

      const { data, page, total } = response.data;

      resolve({
        data,
        page: page - 1,
        totalCount: total,
      });
    } catch (error) {
      reject(error);
    }
  });

/**
 * Processes a new page of remote data, recording the item IDs and preloading item details as appropriate.
 */
export const processNewPage = createAsyncThunk(
  "table/processNewPage",
  async (dataPromise, { dispatch, getState }) => {
    const preloadDetails = getState().table.preloadDetails;
    const items = getState().table.items;

    if (preloadDetails) {
      const { data } = await dataPromise;
      new Promise(async () => {
        for (const row of data) {
          const itemId = row.id;
          if (!items[itemId]) {
            dispatch(fetchDetailsById(itemId));
            // Let's proactively rate-limit ourselves to not crash the API
            await new Promise((resolve) => setTimeout(resolve, 125));
          }
        }
      });
    }
  }
);

/**
 * Dispatch a request for a given item to the API server and store the results in the item cache.
 */
export const fetchDetailsById = createAsyncThunk(
  "details/fetchById",
  async (itemId) => {
    const response = await axios.get(`https://reqres.in/api/users/${itemId}`);

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

    // Although `material-table` does not natively allow managing remote data via controlled state, we keep track of
    // a couple of important details so that we can keep the Table component as clean as possible.
    pageSize: 10,
    preloadDetails: false,
    currentPageIds: [],
  },
  reducers: {
    // Items
    // -----
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

    // Detail panels
    // -------------
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
    setPanelStateAllClosed: (state) => {
      state.openPanels = [];
    },

    // Pagination and data
    // -------------------
    setPageSize: (state, action) => {
      // `material-table` also tells us what the current page size is
      state.pageSize = action.payload;
    },
    togglePreload: (state) => {
      state.preloadDetails = !state.preloadDetails;
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
  registerItemHit,
  setPanelStateOpen,
  setPanelStateClosed,
  setPanelStateAllClosed,
  setPageSize,
  togglePreload,
} = tableSlice.actions;

export default tableSlice.reducer;
