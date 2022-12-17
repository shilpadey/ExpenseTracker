import React, { useRef, useState } from "react";

import classes from  './AuthForm.module.css';

const AuthForm = () => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordRef = useRef();

    const [ passwordMatch , setPasswordMatch ] = useState(true);
    const [ isLoading, setIsLoading ] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredConfirmPassword = confirmPasswordRef.current.value;

        if(enteredPassword !== enteredConfirmPassword){
            passwordInputRef.current.value = null;
            confirmPasswordRef.current.value = null;
            return setPasswordMatch(true);
        }

        setIsLoading(true);
        fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAWKUk44IYxrW_ootO-9v0x-K784qaGZgA ',
            {
                method: 'POST',
                body: JSON.stringify({
                    email : enteredEmail,
                    password : enteredPassword,
                    returnSecureToken : true,
                }),
                headers : {
                'Content-Type' : 'application/json',
                },
            },
        ).then(async (res) => {
            setIsLoading(false);
            if(res.ok){
                setPasswordMatch(true);
                alert('User Successfully Registerd');
                return res.json();
            }else{
                const data = await res.json();
                console.log(data);
                let errorMessage = 'Authentication failed';
                if (data && data.error && data.error.message) {
                    errorMessage = data.error.message;
                }
                alert(errorMessage);
            }
        })
    };

    return (
        <section>
            <div className={classes.form}>
                <h1>Sign Up</h1>
                <form onSubmit={submitHandler}>
                    <div className={classes.control}>
                        <input 
                            type='email' 
                            placeholder="Email" 
                            htmlFor="email" 
                            ref={emailInputRef} 
                            required
                        />
                    </div>
                    <div className={classes.control}>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            htmlFor="password" 
                            minLength="6"
                            maxLength="16"
                            ref={passwordInputRef}
                            required
                        />
                    </div>
                    <div className={classes.control}>
                        <input 
                            type="password" 
                            placeholder="Confirm Password" 
                            htmlFor="password"
                            minLength="6"
                            maxLength="16" 
                            ref={confirmPasswordRef}
                            required
                        />
                    </div>
                    <div className={classes.actions}>
                        {!isLoading && passwordMatch && <button>Sign Up</button>}
                        {isLoading && passwordMatch && <p>Sending Request...</p>}
                        {isLoading && !passwordMatch && <p>Password Doesn't match try again later</p>}
                    </div>
                </form>
            </div>
            <div className={classes.login}>
                <button>Have an account?Login</button>
            </div>
        </section>
    );
};

export default AuthForm;