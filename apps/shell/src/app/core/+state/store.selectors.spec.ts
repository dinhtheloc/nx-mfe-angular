import { StoreEntity } from './store.models';
import {
  storeAdapter,
  StorePartialState,
  initialStoreState,
} from './store.reducer';
import * as StoreSelectors from './store.selectors';

describe('Store Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getStoreId = (it: StoreEntity) => it.id;
  const createStoreEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as StoreEntity);

  let state: StorePartialState;

  beforeEach(() => {
    state = {
      store: storeAdapter.setAll(
        [
          createStoreEntity('PRODUCT-AAA'),
          createStoreEntity('PRODUCT-BBB'),
          createStoreEntity('PRODUCT-CCC'),
        ],
        {
          ...initialStoreState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Store Selectors', () => {
    it('getAllStore() should return the list of Store', () => {
      const results = StoreSelectors.getAllStore(state);
      const selId = getStoreId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = StoreSelectors.getSelected(state) as StoreEntity;
      const selId = getStoreId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getStoreLoaded() should return the current "loaded" status', () => {
      const result = StoreSelectors.getStoreLoaded(state);

      expect(result).toBe(true);
    });

    it('getStoreError() should return the current "error" state', () => {
      const result = StoreSelectors.getStoreError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
