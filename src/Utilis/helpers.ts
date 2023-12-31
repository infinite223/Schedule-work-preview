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

export const localVerifyRegisterData = (email: string, password: string, nameUser: string) => {
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

    if(nameUser.length < minNameUserLength) {
        error += "Nick jest zbyt krótki"
         status = 400
    }

    return { error, status }
}

export const firebaseHandlingErrors = (notify: any, e: string) => {
    let errorMessage = "";
    switch (e) {
        case "auth/user-disabled":
        errorMessage = "Konto użytkownika zostało wyłączone.";
        break;
        case "auth/user-not-found":
        case "auth/wrong-password":
        errorMessage = "Nieprawidłowy adres e-mail lub hasło.";
        break;
      case "auth/email-already-in-use":
        errorMessage = "Adres e-mail jest już w użyciu.";
        break;
      case "auth/invalid-email":
        errorMessage = "Nieprawidłowy adres e-mail.";
        break;
      case "auth/operation-not-allowed":
        errorMessage = "Rejestracja jest obecnie wyłączona.";
        break;
      case "auth/weak-password":
        errorMessage = "Hasło jest za słabe.";
        break;
      default:
        errorMessage = "Wystąpił nieznany błąd rejestracji.";
    }
    notify({
        message: errorMessage,
        status: "error",
        title: "Błąd logowania",
    });
}