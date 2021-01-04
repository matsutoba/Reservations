import React from 'react';

export interface LoginState {
    userId: string,
    password: string,
    login?: boolean,
    message?: string,
}

export enum LoginActionType {
    CHECK = 'check',
    LOGIN = 'login'
}

export interface LoginAction {
    type: LoginActionType,
    payload: LoginState
}

export const loginReducer: React.Reducer<LoginState, LoginAction> = (state: LoginState, action: LoginAction) => {
    switch (action.type) {
        case LoginActionType.CHECK: {
            let _userId = state.userId;
            let _password = state.password;
            if ( action.payload.userId.length <= 8  ) {
                _userId = action.payload.userId;
            }
            if ( action.payload.password.length <= 8 ) {
                _password = action.payload.password;
            }
            return {
                userId: _userId,
                password: _password,
            }
        }
        case LoginActionType.LOGIN: {
            console.log( action.payload );
            if ( action.payload.userId === '' || action.payload.password === '' ) {
                return {
                    ...state,
                    login: false,
                    message: 'ユーザID または パスワードが未入力です'
                }
            }
            if ( action.payload.userId !== '99999' || action.payload.password !== 'password' ) {
                return {
                    ...state,
                    login: false,
                    message: 'ユーザID または パスワードが違います'
                }
            }

            sessionStorage.setItem('isLogin', 'true');

            return {
                ...state,
                login: true
            }
        }
        default:        
    }
    return {
        ...state
    }

}