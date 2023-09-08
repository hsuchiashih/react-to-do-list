import { Route, Routes } from 'react-router-dom'
import Auth from './views/Auth'
import SignUp from './views/SignUp'
import Login from './views/Login'
import Todo from './views/Todo'
import NotFound from './views/NotFound'
import { HashRouter } from 'react-router-dom'
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={ <Auth/> }>
          <Route path="" element={ <Login/> }/>
          <Route path="sign_up" element={ <SignUp/> }/>
        </Route>
        <Route path="/todo" element={ <Todo/> }/>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </HashRouter>
  )
}

export default App
