export interface ICar {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

export interface IMake {
  MakeName: string;
  MakeId: number;
}

export interface ITableData {
  Results: ICar[];
}

export interface ICarHeader {
  makeId: string;
  year: string;
}

export interface IButtonProps {
  href: string;
  disabled?: boolean;
  text: string;
}

export interface IMakesResponse {
  Results: Array<{
    MakeId: number;
    MakeName: string;
  }>;
}
