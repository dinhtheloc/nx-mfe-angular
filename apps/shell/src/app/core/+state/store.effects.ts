import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as StoreActions from './store.actions';
import * as StoreFeature from './store.reducer';

@Injectable()
export class StoreEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreActions.initStore),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return StoreActions.loadStoreSuccess({ store: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return StoreActions.loadStoreFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
