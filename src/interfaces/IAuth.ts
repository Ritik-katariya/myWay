

export interface ISignUp{
    name: string;
    email: string;
    password: string;
}

export interface ISignIn{
    email: string;
    password: string;
}
export interface IOTPVerification{
    email: string;
    otp: string;
}

export interface IResend{
    email: string;
    type: 'EMAIL_VERIFICATION' | 'PASSWORD_FORGOT';
}

export interface IForgotPassword{
    email: string;
}
export interface IResetPassword{
    email: string;
    otp: string;
    newPassword: string;
}