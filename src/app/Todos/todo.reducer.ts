
import { createReducer, on } from "@ngrx/store";
import {TodoState} from "./todo.model";
import * as TodoActions from "./todo.actions"


export const todoFeatureKey = "todos";

export const initialTodoState:TodoState ={
        todos:[],
        loading:false,
        error:null
};

export const todoReducer = createReducer(
        initialTodoState,

        // Load Todo
        on(TodoActions.loadTodos , (state)=>({
                ...state,
                loading:true,
                error:null
        })),
        on(TodoActions.loadTodoSuccess , (state , {todos})=>({
                ...state,
                todos:[...todos],
                loading:false,
                error:null
               
        })),
        on(TodoActions.loadTodoFailure,(state , {error})=>({
                ...state,
                error: error || "Failed to load todos",
                loading:false
        })),

        // Add Todo
        on(TodoActions.addTodo , (state)=>({
                ...state,
                loading:true,
                error:null
        })),
        on(TodoActions.addTodoSuccess , (state , {todo})=>({
                ...state,
                loading:false,
                todos:[...state.todos, todo]
        })),
        on(TodoActions.addTodoFailure , (state , {error})=>({
                ...state,
                loading:false,
                error:error || "Failed to Add Todo"
        })),

        // Update Todo 
        on(TodoActions.updateTodo,(state)=>({
                ...state,
                loading:true,
                error:null
        })),
        on(TodoActions.updateTodoSuccess,(state,{todo})=>({
                ...state,
                loading:false,
                todos: state.todos.map( item => item.id === todo.id ? todo : item),
        })),
        on(TodoActions.updateTodoFailure,(state,{error})=>({
                ...state,
                loading:false,
                error: error || "Failed To Update Todo",
        })),

        // Delete Todo
        on(TodoActions.deleteTodo,(state)=>({
                ...state,
                loading:true,
                error:null
        })),
        on(TodoActions.deleteTodoSuccess,(state,{todoId})=>({
                ...state,
                loading:false,
                todos: state.todos.filter(item => item.id !== todoId),
        })),
        on(TodoActions.deleteTodoFailure,(state,{error})=>({
                ...state,
                loading:false,
                error: error || "Failed To Delete Todo",
        })),
)