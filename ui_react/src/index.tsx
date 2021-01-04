import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from 'react-query'
import { store } from './store';

import Login from './components/Login';
import Main from './components/Main';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import Authenticate from './components/Authenticate';
import './css/style.css';

/*
ReactDOM.render(
    <Login />,
    document.getElementById('root')
);
*/

   
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
          // refetchOnWindowFocus=trueのとき、WindowsにFocusが来るとfetchする
          refetchOnWindowFocus: true,
    
          // refetchOnWindowFocus=trueのとき、
          // Focusが外れてもstaleTime以内ならrefetchしない
          staleTime: 0.1 * 60 * 1000,
    
          // サスペンスを使うには <Suspense/>が必要
          suspense: false,
        }
    }
});

ReactDOM.render(
    <React.StrictMode>
        <QueryClientProvider client={ queryClient }>
            <Provider store={store}>

                <BrowserRouter>
                    <Switch>
                        <Route exact path='/'>
                            <Login />
                        </Route>
                        <Route excat path='/main'>
                            <Main />
                        </Route>
                    </Switch>                
                </BrowserRouter>
            </Provider>
        </QueryClientProvider >
    </React.StrictMode>
    ,
    document.getElementById('root')
);

