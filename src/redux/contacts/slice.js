import { createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchContacts, addContact, editContact, deleteContact } from "./operations";
import { selectNameFilter } from "../filters/selectors";
import { selectContacts } from "./selectors";
import { logOut } from "../auth/operations";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  reducers: {
    changeCurrentContact: (state, action) => {
      state.currentContact = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(logOut.fulfilled, () => {
        return {
          items: [],
          isLoading: false,
          error: null,
        };
      })

      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)

      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)

      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(editContact.pending, handlePending)
      .addCase(editContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.items = state.items.map((item) =>
          item.id === state.currentContact.id ? action.payload : item
        );
        state.currentContact = null;
      })
      .addCase(editContact.rejected, handleRejected)
      
  },
});

export const contactsReducer = contactsSlice.reducer;

export const { changeCurrentContact } = contactsSlice.actions;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    if (!filter) return contacts;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
