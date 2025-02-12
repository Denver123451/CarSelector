export interface ICar {
    Make_ID: number;
    Make_Name: string;
    Model_ID: number;
    Model_Name: string;
}

export interface IMake {
    MakeId: string;
    MakeName: string;
}

export interface ITableData {
    data: ICar[];
}

export interface ICarHeader{
    makeId: string;
    year: string;
}