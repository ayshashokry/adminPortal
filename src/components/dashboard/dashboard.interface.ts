// types/dataTypes.ts
export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  export interface Merchant {
    id: number;
    storeName: string;
    owner: string;
  }
  
  export interface Request {
    id: number;
    status: string;
    type: string;
  }
  
  export interface Setting {
    id: number;
    key: string;
    value: string;
  }
  
  export interface Role {
    id: number;
    roleName: string;
    permissions: string[];
  }
  
  export type DataMap = {
    user: User;
    merchants: Merchant;
    requests: Request;
    settings: Setting;
    roles: Role;
  };
  