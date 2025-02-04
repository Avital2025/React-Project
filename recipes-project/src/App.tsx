import { RouterProvider } from 'react-router'
import './App.css'
import MyRouter from './myRouter'
import store from './ReduxStore'
import { Provider } from 'react-redux'
import { createContext, Dispatch, useReducer, useState } from 'react'
import { UserType } from './userType'
import { action, actionUser } from './userActionType'

export const User = createContext<{ user: UserType, userDispatch: Dispatch<action> }>(
   {
      user: {},
      userDispatch: () => null
   })

export const IsLogin = createContext<[boolean, Dispatch<React.SetStateAction<boolean>>]>([false, () => null])

function App() {
   const [user, userDispatch] = useReducer(actionUser, {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      address: '',
      phon: ''
   })

   const [isLogin, setIsLogin] = useState(false)
   return (<>
      <IsLogin value={[isLogin, setIsLogin]}>
         <User value={{ user, userDispatch }} >
            <Provider store={store}>
            <RouterProvider router={MyRouter} />
            </Provider>
         </User>
      </IsLogin>
   </>)
}

export default App


