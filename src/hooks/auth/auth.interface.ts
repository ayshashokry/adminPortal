export interface authInterface {
  email: string;
  password?: string;
}

export interface ForgetPassInterface {
  email: string;
}

export interface otpInterface {
  otp?: string;
  email:string
}
export interface confirmChecksInterface{
  id: number,
  name: string,
  checked: boolean,
  regex: RegExp,
}

export interface newPasswordInterface{
  oldPassword?:string,
  newPassword:string,
  confirmPassword:string
}