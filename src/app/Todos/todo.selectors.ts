import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TodoState } from "./todo.model";


export const selectTodosState = createFeatureSelector<TodoState>('todos');


export const selectAllTodos = createSelector(
        selectTodosState,
        (state) => state.todos
);

export const selectTodosLoading = createSelector(
        selectTodosState,
        (state) => state.loading
);

export const selectTodosError = createSelector(
        selectTodosState,
        (state) => state.error
);