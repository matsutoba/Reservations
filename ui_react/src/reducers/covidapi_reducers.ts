import React from 'react';

export interface CovidApiState {
    isSuccess: boolean;
}

export enum CovidApiActionType {
    GET_POSITIVES = 'CovidApi_GetPositives',
    GET_CONSULTINGS = 'CovidApi_GetConsultings'
}

export interface CovidApiAction {
    type: CovidApiActionType,
    payload: CovidApiState
}

export const loginReducer: React.Reducer<CovidApiState, CovidApiAction> = (state: CovidApiState, action: CovidApiAction) => {
    switch (action.type) {
        case CovidApiActionType.GET_CONSULTINGS:
        
        case CovidApiActionType.GET_POSITIVES:
            (async()=>{

                
            })();
        default:
    }
 
    return {
        ...state
    }

}