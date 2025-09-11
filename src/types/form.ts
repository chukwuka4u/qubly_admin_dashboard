interface SignInForm {
    email: string,
    password: string
}
interface SignUpForm {
    adminName: string,
    organization: string,
    address: string,
    email: string,
    password: string,
    passwordConfirmation: string,
}

export type { SignInForm, SignUpForm }