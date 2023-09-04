
import logo from '../../src/assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom"
import axios from 'axios';
function Todo({ token }) {
    const { VITE_APP_SITE } = import.meta.env;
    const navigate = useNavigate();
    const signOut = async () => {
        const params = {
          headers: {
            Authorization: token,
          },
        }
        try {
          const response = await axios.post(`${VITE_APP_SITE}/users/sign_out`, {} , params);
          console.log('登出成功', response);
          navigate('/auth/login')
        } catch (error) {
          console.log('登出失敗', error);
        }
      } 
  return (
    <div id="todoListPage" className="bg-half">
      <nav>
          <a href="#"><img className="logoImg" src={logo} alt="" /></a>
          <ul>
              <li className="todo_sm"><span>王小明的代辦</span></li>
              <li><a href="#" onClick={signOut}>登出</a></li>
          </ul>
      </nav>
      <div className="conatiner todoListPage vhContainer">
          <div className="todoList_Content">
              <div className="inputBox">
                  <input type="text" placeholder="請輸入待辦事項"/>
                  <a href="#">
                    <FontAwesomeIcon icon={faPlus} />
                  </a>
              </div>
              <div className="todoList_list">
                  <ul className="todoList_tab">
                      <li><a href="#" className="active">全部</a></li>
                      <li><a href="#">待完成</a></li>
                      <li><a href="#">已完成</a></li>
                  </ul>
                  <div className="todoList_items">
                      <ul className="todoList_item">
                          <li>
                              <label className="todoList_label">
                                  <input className="todoList_input" type="checkbox" value="true"/>
                                  <span>把冰箱發霉的檸檬拿去丟</span>
                              </label>
                              <a href="#">
                                  <i className="fa fa-times"></i>
                              </a>
                          </li>
                          <li>
                              <label className="todoList_label">
                                  <input className="todoList_input" type="checkbox" value="true"/>
                                  <span>打電話叫媽媽匯款給我</span>
                              </label>
                              <a href="#">
                                  <i className="fa fa-times"></i>
                              </a>
                          </li>
                          <li>
                              <label className="todoList_label">
                                  <input className="todoList_input" type="checkbox" value="true"/>
                                  <span>整理電腦資料夾</span>
                              </label>
                              <a href="#">
                                  <i className="fa fa-times"></i>
                              </a>
                          </li>
                          <li>
                              <label className="todoList_label">
                                  <input className="todoList_input" type="checkbox" value="true"/>
                                  <span>繳電費水費瓦斯費</span>
                              </label>
                              <a href="#">
                                  <i className="fa fa-times"></i>
                              </a>
                          </li>
                          <li>
                              <label className="todoList_label">
                                  <input className="todoList_input" type="checkbox" value="true"/>
                                  <span>約vicky禮拜三泡溫泉</span>
                              </label>
                              <a href="#">
                                  <i className="fa fa-times"></i>
                              </a>
                          </li>
                          <li>
                              <label className="todoList_label">
                                  <input className="todoList_input" type="checkbox" value="true"/>
                                  <span>約ada禮拜四吃晚餐</span>
                              </label>
                              <a href="#">
                                  <i className="fa fa-times"></i>
                              </a>
                          </li>
                      </ul>
                      <div className="todoList_statistics">
                          <p> 5 個已完成項目</p>
                          <a href="#">清除已完成項目</a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Todo