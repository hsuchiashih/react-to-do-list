import { useState, useEffect } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom"

function Login() {
  const { VITE_APP_SITE } = import.meta.env;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmpty, setIsEmpty] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (email.length > 0) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
   }, [email]);
  const signIn = async () => {
    const params = {email, password}
    try {
      const response = await axios.post(`${VITE_APP_SITE}/users/sign_in`, params);
      const token = response.data.token
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      document.cookie = `todoToken=${token}; expires=${tomorrow.toUTCString()}`;
      
      console.log(
        document.cookie
          .split('; ')
          .find((row) => row.startsWith('todoToken')),
      );

      navigate('/todo')
      // console.log(response);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const toSignUpPage = () => {
    navigate('/auth/sign_up')
  }

  return (
    <div>
      <form className="formControls" action="index.html">
          <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
          <label className="formControls_label" htmlFor="email">Email</label>
          <input className="formControls_input" type="email" id="email" name="email" placeholder="請輸入 email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          {isEmpty && <span>此欄位不可留空</span> }
          <label className="formControls_label" htmlFor="password">密碼</label>
          <input className="formControls_input" type="password" name="password" id="password" placeholder="請輸入密碼" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <input className="formControls_btnSubmit" type="button" onClick={signIn} value="登入"/>
          <div className="formControls_btnLink" onClick={toSignUpPage}>註冊帳號</div>
      </form>
    </div>
  )
}

export default Login