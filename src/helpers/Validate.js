import _ from 'lodash';

class Validate {

    static emailName(value) {

        let error = this.required(value, 'email');

        if (!this.isEmail(value)) {
            error = 'It looks like that isn’t a valid email address.';
        }

        return error;
    }

    static password(value) {

        return this.required(value, 'password');
    }

    static required(val, path) {
        const value = (val || '').trim();

        let error = null;

        if (!value) {
            error = `This is required — you’ll need to enter an ${path}.`;
        }

        return error;
    }

    static isEmail(val) {
        const check_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return check_email.test(String(val).toLowerCase());
    }

    static hasError(errors) {
        return _.some(errors, (e) => e);
    }
}

export default Validate;
