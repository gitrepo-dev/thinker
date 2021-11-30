import { Validation_Type } from './formConstant';

export const validator = (validationType = '', value = '') => {
    let errorText = '';
    if (value.trim() === '') errorText = 'This field is required'
    else {
        switch (validationType) {                             
            case Validation_Type.EMAIL:
                const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!email.test(String(value).toLowerCase())) errorText = 'Must be a valid email';          
                break;            
            case Validation_Type.ALPHA:
                const alphabate = /^[a-zA-Z ]+$/;
                if (!alphabate.test(value)) errorText = 'Must be alphabet';
                break;
            case Validation_Type.PASSWORD:
                const passwordRegx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
                if (!passwordRegx.test(value)) errorText = 'Must be length between 8 to 15 characters, at least one upper & one lower case letter, one number, one special character';
                break;
        }
    }
    return errorText;
}


