import { useState } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2";

function SignUp() {
  const { VITE_APP_SITE } = import.meta.env;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordForCheck, setpasswordForCheck] = useState('');
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  const signUp = async () => {
    const params = { email, password, nickname }
    try {
      await axios.post(`${VITE_APP_SITE}/users/sign_up`, params);
      Swal.fire({
        icon: 'success',
        title: '註冊成功'
      });
      navigate('/')
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '註冊失敗',
        text: error.response.data.message,
        showConfirmButton: true
      });
      console.log(error);
    }
  }
  const toLoginPage = () => {
    navigate('/')
  }
  return (
    <div>
      <form className="formControls" action="index.html">
        <h2 className="formControls_txt">註冊帳號</h2>
        <label className="formControls_label" htmlFor="email">Email</label>
        <input className="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email"
          value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label className="formControls_label" htmlFor="name">您的暱稱</label>
        <input className="formControls_input" type="text" name="name" id="name" placeholder="請輸入您的暱稱"
          value={nickname} onChange={(e) => setNickname(e.target.value)} />
        <label className="formControls_label" htmlFor="pwd">密碼</label>
        <input className="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼"
          value={password} onChange={(e) => setPassword(e.target.value)} required />
        <label className="formControls_label" htmlFor="passwordForCheck">再次輸入密碼</label>
        <input className="formControls_input" type="password" name="passwordForCheck" id="passwordForCheck" placeholder="請再次輸入密碼"
          value={passwordForCheck} onChange={(e) => setpasswordForCheck(e.target.value)} required />
        <input className="formControls_btnSubmit" type="button" value="註冊帳號" onClick={signUp} />
        <div className="formControls_btnLink" onClick={toLoginPage}>登入</div>
      </form>
    </div>
  )
}

export default SignUp