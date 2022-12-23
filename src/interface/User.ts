export class User{
    public id:number = -1;
    public account:string = "";
    public password:string = "";
    public role: number = 0;
    public phone:string = "";
    public email:string = "";
    /**
     * 状态，0为正常，1为有书未还，2为黑名单用户
     */
    public status: 0 | 1 | 2 = 0;
    public isUpdate:boolean = false;
    public index:number = -1;
    public isAdd:boolean = false;
}