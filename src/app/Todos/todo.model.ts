import { User } from "../Auth/auth.model";

export interface Todo{
        id:string;
        userId:string;
        task:string;
        completed:boolean;
        createdAt?:string;
}

export interface TodoState{
        todos:Todo[];
        loading:boolean;
        error: string | null;
}

export interface DbData{
        todos: Todo[];
        users: User[];
}