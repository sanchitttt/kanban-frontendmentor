import isEmail from 'validator/lib/isEmail';
/**
 * 
 * @param {*} name 
 * @returns sucesss string if no error and a string containing the error if error exists
 */

export const verifyName = (name) => {
    if (name.length < 4 || name.length > 20) {
        return 'Name should be between 4 to 20 characters long';
    }
    else {
        return 'success';
    }
}

/**
 * 
 * @param {*} email 
 * @returns sucesss string if no error and a string containing the error if error exists
 */

export const verifyEmail = (email) => {
    if (!isEmail(email)) {
        return 'Please enter a valid email address';
    }
    else {
        return 'success';
    }
}

/**
 * 
 * @param {*} password 
 * @returns sucesss string if no error and a string containing the error if error exists
 */


export const verifyPassword = (password) => {
    if (password.length < 8) {
        return "password must be at least 8 characters";
    }
    if (!password.match(/\d/) || !password.match(/[A-Z]/ || !password.match(/[a-z]/))) {
        return "password must contain uppercase, lowercase letters and a digit"
    }
    return 'success';
}
