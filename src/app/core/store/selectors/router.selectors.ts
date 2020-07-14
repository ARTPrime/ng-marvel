import { RouterState } from '@models/custom-router-serializer.interface';
import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';

export const selectRouterState: MemoizedSelector<object, RouterState> = createFeatureSelector<RouterState>('router');
