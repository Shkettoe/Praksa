import { Role } from "./Role";

export class User{
    constructor(public id:number = 0, public username:string = '', public email:string = '', public role = new Role()){}
}