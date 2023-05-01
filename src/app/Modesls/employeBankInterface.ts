export interface Country {
    name?: string;
    code?: string;
}

export interface Representative {
    name?: string;
    image?: string;
}

export interface Customer {
    id?: number;
    name?: number;
    country?: Country;
    company?: string;
    date?: string;
    status?: string;
    representative?: Representative;
}
export interface Employee{
    accname?:string,
    accno?:string,
    bankName?:string,
    empId?:number,
    firstName?:string,
    LastName?:string
}

