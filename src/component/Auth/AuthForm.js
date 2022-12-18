import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from  './AuthForm.module.css';

const AuthForm = () => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordRef = useRef();

    const [ isLogin , setIsLogin ] = useState(true);
    const [ isLoading, setIsLoading ] = useState(false);
    const navigate = useNavigate();

    const switchHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = async(event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        //const enteredConfirmPassword = confirmPasswordRef.current.value;


        setIsLoading(true);
        if(isLogin){
            try{
                const response = await fetch(
                    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAWKUk44IYxrW_ootO-9v0x-K784qaGZgA',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            email: enteredEmail,
                            password: enteredPassword,
                            returnSecureToken: true,
                        }),
                        headers : {
                            'Content-Type' : 'application/json',
                        },
                    },
                )
                if(response.ok){
                    setIsLoading(false);
                    const data = await response.json();

                    alert("User has successfully Loged in.");
                    localStorage.setItem("Token", data.idToken);
                    localStorage.setItem("userID", data.localId);
                    emailInputRef.current.value = "";
                    passwordInputRef.current.value = "";
                    setIsLogin(true);
                    navigate('/expense');
                }else{
                    const data = await response.json();
                    alert(data.error.message);
                    if(data.error.message === 'EMAIL_NOT_FOUND'){
                        emailInputRef.current.value = null;
                        passwordInputRef.current.value = null;
                    }else if(data.error.message === 'PASSWORD INVALID'){
                        passwordInputRef.current.value = null;
                    }
                }
                
            }catch (err) {
                alert(err);
            }
        }else {
            if(enteredPassword !== confirmPasswordRef.current.value){
                passwordInputRef.current.value = null;
                confirmPasswordRef.current.value = null;
                alert("Password doesn't match!");
            }else{
                try{
                    const res = await fetch(
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
                    )
                    if(res.ok){
                        setIsLoading(false);
                        console.log("User has successfully signed up.");
                        emailInputRef.current.value = "";
                        passwordInputRef.current.value = "";
                        confirmPasswordRef.current.value = "";
                        setIsLogin(false);
                    }else{
                        const data = await res.json();
                        alert(data.error.message);
                    }
                }catch(err) {
                    alert(err);
                }
            }
        }
        
    };

    /*const resetInput = (error) => {
        if(error === 'EMAIL_EXISTS'){
            emailInputRef.current.value = null;
            passwordInputRef.current.value = null;
        }else if(error === 'PASSWORD INVALID'){
            passwordInputRef.current.value = null;
        }
    };*/

    return (
        <section>
            <div className={classes.form}>
                <h1>{isLogin? "Login" : "Sign Up"}</h1>
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
                        {!isLogin && (<input 
                            type="password" 
                            placeholder="Confirm Password" 
                            htmlFor="password"
                            minLength="6"
                            maxLength="16" 
                            ref={confirmPasswordRef}
                            required
                        />)}
                    </div>
                    <div className={classes.actions}>
                        {!isLoading && (<button>{isLogin? "Login" : "Sign Up"}</button>)}
                        {isLogin && <a href="#">Forget Password</a>}
                    </div>
                </form>
            </div>
            <div className={classes.login} onClick={switchHandler}>
                <button>{isLogin? 'Dont Have an account?Sign Up' : 'Have an account?Login'}</button>
            </div>
        </section>
    );
};

export default AuthForm;