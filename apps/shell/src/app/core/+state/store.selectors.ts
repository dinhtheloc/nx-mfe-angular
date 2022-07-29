import { createFeatureSelector, createSelector } from '@ngrx/store';
import { STORE_FEATURE_KEY, StoreState, storeAdapter } from './store.reducer';

// Lookup the 'Store' feature state managed by NgRx
export const getStoreState =
  createFeatureSelector<StoreState>(STORE_FEATURE_KEY);

const { selectAll, selectEntities } = storeAdapter.getSelectors();

export const getStoreLoaded = createSelector(
  getStoreState,
  (state: StoreState) => state.loaded
);

export const getStoreError = createSelector(
  getStoreState,
  (state: StoreState) => state.error
);

export const getAllStore = createSelector(getStoreState, (state: StoreState) =>
  selectAll(state)
);

export const getStoreEntities = createSelector(
  getStoreState,
  (state: StoreState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getStoreState,
  (state: StoreState) => state.selectedId
);

export const getSelected = createSelector(
  getStoreEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
