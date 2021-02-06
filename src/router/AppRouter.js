import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch, Redirect
} from 'react-router-dom';
import { firebase } from '../firebase/firebaseConfig'
import { JornalScreen } from '../components/jornal/JornalScreen'
import { AuthRouter } from './AuthRouter'
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute';
import { startLoadNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch()
    const [checking, setChecking] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName))
                setIsLoggedIn(true);
                dispatch(startLoadNotes(user.uid))

            } else {
                setIsLoggedIn(false);
            }
            setChecking(false);
        })
    }, [dispatch, setIsLoggedIn, setChecking]);

    if (checking) {
        return (
            <h1>Wait...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth"
                        isAuthenticated={isLoggedIn}
                        component={AuthRouter}
                    />

                    <PrivateRoute
                        exact
                        path="/"
                        component={JornalScreen}
                        isAuthenticated={isLoggedIn}
                    />

                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </Router>
    )
}
