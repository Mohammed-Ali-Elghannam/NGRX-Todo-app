import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from '../todo.model';
import * as TodoSelsctors from "../todo.selectors";
import * as TodoActions from "../todo.actions"


@Component({
  selector: 'app-todo-list',
  imports: [FormsModule , CommonModule,],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss'
})
export class TodoList implements OnInit {

  private store = inject(Store);

  todos$!: Observable<Todo[]>;
  error$! :Observable<string | null>;
  isLoading$! : Observable<boolean>;

  newTask:string="";
  editingTodo :Todo | null = null;
  updatedTask : string="";

  constructor(){
    this.error$ = this.store.select(TodoSelsctors.selectTodosError);
    this.isLoading$ =this.store.select(TodoSelsctors.selectTodosLoading);
    this.todos$ = this.store.select(TodoSelsctors.selectAllTodos);
    console.log("all todos from constructor",this.todos$);
  }

  ngOnInit(): void {
    this.store.dispatch(TodoActions.loadTodos());
    //this.todos$.subscribe(data => console.log('Todos from store:', data));
    
  }


  addTodo(){
    if(!this.newTask.trim()){
      console.log("error at add new task");
      return;
    }
    console.log("add new task");
    this.store.dispatch(TodoActions.addTodo({task:this.newTask.trim()}));
    this.newTask = '';
  };


  toggleComplete(todo:Todo){
    const updatedTodo = {...todo, completed:!todo.completed};
    this.store.dispatch(TodoActions.updateTodo({ todo : updatedTodo}))
  };

  deleteTodo(todoId:string){
    if(confirm(" Are you sure you want to delete ? ")){
      this.store.dispatch(TodoActions.deleteTodo({todoId}));
    }
  };

  startEdit(todo:Todo){
    this.editingTodo = {...todo};
    this.updatedTask = todo.task;
  };

  saveEdit(){
    if(this.editingTodo && this.updatedTask.trim()){
      const todoToUpdate = {...this.editingTodo , task: this.updatedTask.trim()};
      this.store.dispatch(TodoActions.updateTodo({todo:todoToUpdate}));
      this.cancelEdit();
    }
  };

  cancelEdit(){
    this.editingTodo = null;
    this.updatedTask = '';

  };

}
