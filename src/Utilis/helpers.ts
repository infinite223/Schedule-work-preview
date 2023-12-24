const minPasswordLength = 5
const minEmailLength = 2
const minNameUserLength = 3


export const localVerifyLoginData = (email: string, password: string) => {
    let error = ""
    let status = 200

    if(email.length < minEmailLength) {
        error += "Email jest zbyt krótki, "
         status = 400
    }

    if(password.length < minPasswordLength) {
        error += "Hasło jest zbyt krótkie"
         status = 400
    }

    return { error, status }
}

export const localVerifyRegisterData = (email: string, password: string) => {
    let error = ""
    let status = 200

    if(email.length < minEmailLength) {
        error += "Email jest zbyt krótki, "
         status = 400
    }

    if(password.length < minPasswordLength) {
        error += "Hasło jest zbyt krótkie"
         status = 400
    }

    return { error, status }
}