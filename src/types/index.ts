
export enum USER_ROLE_ENUM{
    USER='USER',
    ADMIN='ADMIN'
  }
  

export interface IUser{
    firstName: string
    lastName: string
    username: string
    email: string
    role: USER_ROLE_ENUM
  }

export interface IUserModel extends IUser{
  hash_password: string
}  

export interface IUserRegisterDto extends IUser{
  password: string
}

export interface IUserSigninDto{
  email: string
  password: string
}

export interface IAuthSuccessResponse{
  accessToken: string
  refreshToken: string
}

export interface IRefreshTokenDto{
  refreshToken: string
}
  

export enum ErrorConstants{
  USER_ALREADY_EXISTS="USER_ALREADY_EXISTS",
  SOMETHING_WENT_WRONG="SOMETHING_WENT_WRONG",
  USER_DOES_NOT_EXISTS="USER_DOES_NOT_EXISTS",
  INCORRECT_PASSWORD="INCORRECT_PASSWORD",
  INVALID_REFRESH_TOKEN="INVALID_REFRESH_TOKEN",
  DEVELOPER_DOES_NOT_EXIST="DEVELOPER_DOES_NOT_EXIST"
}
