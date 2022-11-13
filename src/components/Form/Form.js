
import { useState, useEffect, useReducer, useContext } from 'react'
import Button from '../UI/Button'
import Card from '../UI/Card'
import AuthContext from '../../store/auth-context'



const emailReducer = (state, action) => {
    if(action.type === 'USER_INPUT'){
        return {value: action.val, isValid: action.val.includes('@')}
    }
    if(action.type === 'INPUT_BLUR'){
        return {value: state.value, isValid: state.value.includes('@')}
    }
    return {value: '', isValid: false}
}

const passwordReducer = (state, action) => {
    if(action.type === 'USER_INPUT'){
        return {value: action.val, isValid: action.val.trim().length > 6}
    }
    if(action.type === 'INPUT_BLUR'){
        return {value: state.value, isValid: state.value.trim().length > 6}
    }
    return {value: '', isValid: false}
}

const Form = () => {
    const ctx = useContext(AuthContext)
    // const [enteredEmail, setEnteredEmail] = useState(''); // managing the entered email
    // const [emailIsValid, setEmailIsValid] = useState(true); //managing validity of entered email
    // const [enteredPassword, setEnteredPassword] = useState(''); // managing the entered pasword
    // const [passwordIsValid, setPasswordIsValid] = useState(); //managing validity of entered password
    const [formIsValid, setFormIsValid] = useState(false); //managing the validity of form

    //Using useReducer below for email field
    const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null})
    //Using useReducer below for password field
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: null})

    //Below useEffect hook will run every time when dependency gets updated/changed
    //To use this useEffect remove setFormIsValid functions from emailChangeHandler & passwordChangeHandler
    // useEffect(() => {
    //     const identifier = setTimeout(()=>{
    //         setFormIsValid(
    //             enteredEmail.includes('@') && enteredPassword.trim().length > 6
    //           );
    //     },500)

    //     return () => {
    //         clearTimeout(identifier)
    //     }
    // }, [enteredEmail, enteredPassword])

    //Object destructuring and alieas assigning it meanse pulling out values 
    //from object and assigning it to variables
    const { isValid: emailIsValid } = emailState
    const { isValid: passwordIsValid } = passwordState


    //using emailIsValid & passwordIsValid we are avoiding unnecceory useEffect after field is validated
    useEffect(() => {
        const identifier = setTimeout(()=>{
            setFormIsValid(
                emailIsValid && passwordIsValid
              );
        },500)

        return () => {
            clearTimeout(identifier)
        }
    }, [emailIsValid, passwordIsValid])

    const emailChangeHandler = (event) => {
        // setEnteredEmail(event.target.value);
        dispatchEmail({type: 'USER_INPUT', val: event.target.value})

        // setFormIsValid(
        //     event.target.value.includes('@') && enteredPassword.trim().length > 6
        //   );
        //added here to make changes for useReducer
        // setFormIsValid(
        //     event.target.value.includes('@') && passwordState.isValid
        //   );
      };
    
      const passwordChangeHandler = (event) => {
        // setEnteredPassword(event.target.value);
        dispatchPassword({type: 'USER_INPUT', val: event.target.value})

        // setFormIsValid(
        //     enteredEmail && event.target.value.trim().length > 6
        //   );
        //added here to make changes for useReducer
        // setFormIsValid(
        //     emailState.isValid && event.target.value.trim().length > 6
        //   );
      };
    
      const validateEmailHandler = () => {
        // setEmailIsValid(emailIsValid);
        // setEmailIsValid(emailState.isValid);
        dispatchEmail({type: 'INPUT_BLUR'})
      };
    
      const validatePasswordHandler = () => {
        // setPasswordIsValid(enteredPassword.trim().length > 6);
        dispatchPassword({type: 'INPUT_BLUR'})
      };

    const submitHandler = (event) => {
        event.preventDefault();
        // props.onLogin(enteredEmail, enteredPassword);
        ctx.onLogin(emailState.value, passwordState.value);
      };

    return (
        <>
            {ctx.isLoggedIn && <Card styled="text-xl font-bold">Welcome Back!</Card>}

            {!ctx.isLoggedIn && <form onSubmit={submitHandler}>
                <div className='py-3 flex flex-col'>
                    <label htmlFor="email" className='font-bold mb-2'>Email</label>
                    <input onBlur={validateEmailHandler} onChange={emailChangeHandler} value={emailState.value} id="email" type="email" className={`tablet:w-96 mobile:w-60 px-2 h-8 rounded-md text-lg outline-none border-2 ${emailState.isValid === false ? 'border-red-600' : ''}`}></input>
                </div>
                <div className='py-3 flex flex-col'>
                    <label htmlFor='password' className='font-bold mb-2'>Password</label>
                    <input onBlur={validatePasswordHandler} onChange={passwordChangeHandler} value={passwordState.value} id="password" type="password" className={`tablet:w-96 mobile:w-60 px-2 h-8 rounded-md text-lg outline-none border-2 ${passwordState.isValid === false ? 'border-red-600' : ''}`}></input>
                </div>
                <div className='flex justify-end'>
                    <Button type="submit" disabled={!formIsValid}>Login</Button>
                </div>
            </form>
            }
        </>
    )
}

export default Form
