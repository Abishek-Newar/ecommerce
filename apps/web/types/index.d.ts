type LabeledInputProps = {
    type: string,
    placeholder: string,
    title: string,
    id: string,
    onChange: (e:any)=>void
}

type SignUpDataType = {
    email: string,
    username: string,
    password: string
}

type SignInDataType = {
    email: string,
    password: string
}