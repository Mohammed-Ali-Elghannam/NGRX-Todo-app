import { createAction, props } from "@ngrx/store";
import { Todo } from "./todo.model";



// Loading Todos
export const loadTodos = createAction(
        "[Todo Page] Load Todo"
);

export const loadTodoSuccess = createAction(
        "[Todo Api] Load Todo Success",
        props<{todos:Todo[]}>()
);

export const loadTodoFailure = createAction(
        "[Todo Api] Load Todo Success",
        props<{error: any}>()
);


// Add Todo
export const addTodo = createAction(
        "[Todo Page] Add Todo",
        props<{task:string}>()
);

export const addTodoSuccess = createAction(
        "[Todo Api] Add Todo Success",
        props<{todo:Todo}>()
);

export const addTodoFailure = createAction(
        "[Todo Api] Add Todo Failure",
        props<{error:any}>()
);

// update Todo
export const updateTodo = createAction(
        "[Todo Page] Update Todo",
        props<{ todo: Partial<Todo> & {id:string} }>()
);

export const updateTodoSuccess = createAction(
        "[Todo Api] Update Todo Success",
        props<{todo:Todo}>()
);

export const updateTodoFailure = createAction(
        "[Todo Api] Update  Todo Failure",
        props<{error:any}>()
);


// Delete Todo
export const deleteTodo = createAction(
        "[Todo Page] Delete Todo",
        props<{todoId:string}>()
);

export const deleteTodoSuccess = createAction(
        "[Todo Api] Delete Todo Success",
        props<{todoId:string}>()
);

export const deleteTodoFailure = createAction(
        "[Todo Api] Delete Todo Failure",
        props<{error:any}>()
);