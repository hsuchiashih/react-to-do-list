import { Route, Routes } from 'react-router-dom'
import Auth from './views/Auth'
import SignUp from './views/SignUp'
import Login from './views/Login'
import Todo from './views/Todo'
import NotFound from './views/NotFound'
import { useState, useEffect } from "react"
function App() {
  const [token, setToken] = useState('');
  const todoToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('todoToken='))
    ?.split('=')[1];
    useEffect(() => {
      if (todoToken) {
        setToken(todoToken);
      }
    }, []);

  return (
    <div>
      <Routes>
        <Route path="/auth" element={ <Auth/> }>
          <Route path="login" element={ <Login/> }/>
          <Route path="sign_up" element={ <SignUp/> }/>
        </Route>
        <Route path="/todo" element={ <Todo token={token}/> }/>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  )
}

export default App
