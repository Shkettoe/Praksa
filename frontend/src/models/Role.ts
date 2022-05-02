import { Permission } from "./Permission";

export class Role{
    constructor(public id: number = 0, public name: string = '', public permissions:Permission[]  = []){}
}