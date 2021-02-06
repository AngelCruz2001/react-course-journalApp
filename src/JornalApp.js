import React from 'react'
import { AppRouter } from './router/AppRouter'
import './styles/styles.scss'
import { Provider } from 'react-redux'
import { store } from './store/store'
export const JornalApp = () => {

    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}
