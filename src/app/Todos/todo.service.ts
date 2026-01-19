import { todoFeatureKey } from './todo.reducer';
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, map, Observable, switchMap, throwError } from "rxjs";
import { Todo } from "./todo.model";
import { v4 } from 'uuid';


@Injectable({
        providedIn: "root"
})
export class TodoService {

        private httpClient = inject(HttpClient);
        private todosUrl = "http://localhost:3000/todos";


        getTodos(userId: string): Observable<Todo[]> {
                return this.httpClient.get<Todo[]>(`${this.todosUrl}?userId=${userId}`).pipe(
                        catchError(this.handleError)
                );
        };

        addTodo(task: string, userId: string): Observable<Todo> {
                const newTodo: Todo = {
                        id: v4(),
                        userId,
                        task,
                        completed: false,
                        createdAt: new Date().toISOString()
                };

                return this.httpClient.post<Todo>(this.todosUrl, newTodo).pipe(
                        catchError(this.handleError)
                );
        }

        updateTodo(todoUpdate: Partial<Todo> & { id: string }, userId: string): Observable<Todo> {
                return this.httpClient.get<Todo>(`${this.todosUrl}/${todoUpdate.id}`).pipe(
                        map(todo => {
                                if (todo.userId !== userId) {
                                        throw new Error("Unauthorized User");
                                }
                                return todo;
                        }),
                        switchMap(()=> this.httpClient.patch<Todo>(`${this.todosUrl}/${todoUpdate.id}`,todoUpdate)),
                        catchError(this.handleError)
                )
        }

        deleteTodo(todoId:string , userId:string):Observable<{}>{
                return this.httpClient.get<Todo>(`${this.todosUrl}/${todoId}`).pipe(
                        map( todo => {
                                if(todo.userId !== userId){
                                        throw new Error("Unauthorized User");
                                }
                                return todo;
                        }),
                        switchMap(()=> this.httpClient.delete<{}>(`${this.todosUrl}/${todoId}`)),
                        catchError(this.handleError)
                )
        }

        private handleError(error: any): Observable<never> {
                console.error("Todo Service Error", error);
                return throwError(() => new Error(error.message || "Todo service Error"));
        };


}