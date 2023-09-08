import { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from 'axios';
import logo from '../../src/assets/logo.png';
import empty from '../../src/assets/empty.png';
import '../../src/css/Auth.css'
function Todo() {
    const { VITE_APP_SITE } = import.meta.env;
    const navigate = useNavigate();
    const [todoList, setTodoList] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [toggleState, setToggleState] = useState('全部');
    const [finishedCount, setFinishedCountState] = useState(0);
    const [nickname, setNickNameState] = useState('');
		const [nothingTodo, setNothingTodoState] = useState(false);
    const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('todoToken='))
    ?.split('=')[1];
    useEffect(() => {
        checkOut();
        getTodos();
    }, []);

    // token驗證（取得nickname）
    const checkOut = async () => {
        try {
            const params = {
                headers: {
                    Authorization: token,
                },
            }

            const response = await axios.get(`${VITE_APP_SITE}/users/checkout`, params);
            if (response) {
                setNickNameState(response.data.nickname)
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'token已過期，請重新登入'
            });
            navigate('/')
            console.log(error);
        }
    }

    // 登出
    const signOut = async () => {
        const params = {
            headers: {
                Authorization: token,
            },
        }
        try {
            await axios.post(`${VITE_APP_SITE}/users/sign_out`, {}, params);
            Swal.fire({
                icon: 'success',
                title: '登出成功',
                text: '',
                showConfirmButton: true
            });
            navigate('/')
        } catch (error) {
            console.log('登出失敗', error);
        }
		}

    // 取得最新todolist狀態
    const getTodos = async () => {
        checkOut();
        try {
            const config = {
                headers: {
                    Authorization: token,
                },
            }

            const response = await axios.get(`${VITE_APP_SITE}/todos/`, config);
            const finishedCount = response.data.data.filter(item => item.status === true).length
						const todoItemCount = response.data.data.length === 0
            setTodoList(response.data.data)
            setFinishedCountState(finishedCount)
						setNothingTodoState(todoItemCount)
        } catch (error) {
            console.log(error);
        }
    };

    // 新增代辦事項
    const addTodo = async () => {
        checkOut()
        try {
            const config = {
                headers: {
                    Authorization: token,
                },
            }
            const params = {
                content: newTodo
            }
            const response = await axios.post(`${VITE_APP_SITE}/todos/`, params, config);
            setNewTodo('');
            getTodos();
            console.log(response);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '代辦項目不可為空',
            });
            console.log(error);
        }
    };

    // 刪除代辦事項
    const deleteTodo = async (id) => {
        checkOut()
        const config = {
            headers: {
                Authorization: token,
            },
        }
        await axios.delete(`${VITE_APP_SITE}/todos/${id}`, config);
        getTodos();
    };

    // 變更代辦事項狀態
    const toggleStatus = async (id) => {
        const config = {
            headers: {
                Authorization: token,
            },
        }
        await axios.patch(`${VITE_APP_SITE}/todos/${id}/toggle`, {}, config);
        getTodos();
    }

    // 清除所有已完成待辦事項
    const clearAllComplete = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                Authorization: token,
            },
        }
        try {
            const doneTodos = todoList.filter(
                (todo) => todo.status && axios.delete(`${VITE_APP_SITE}/todos/${todo.id}`, config)
            );
            if (doneTodos.length == 0) {
                return;
            }

            await Promise.all(doneTodos);

            getTodos();

            setToggleState('全部');
        }
        catch (error) {
            console(error)
        }
    };

    // 變更頁籤內容
    const changeStatus = ((e) => {
        setToggleState(e.target.textContent);
    });

    // 選單頁籤切換
    const chooseState = useMemo(() => {
        return (todoList.filter((item) => {
            if (toggleState == '全部') {
                return item;
            }
            else if (toggleState == '待完成') {
                return !item.status;
            }
            else if (toggleState == '已完成') {
                return item.status;
            }
        }));
    }, [todoList, toggleState]);

    return (
        <div id="todoListPage" className="bg-half">
            <nav>
                <button className="button_reset"><img className="logoImg" src={logo} alt="" /></button>
                <ul>
                    <li className="todo_sm"><span>{nickname}的代辦事項</span></li>
                    <li><a className="button_reset" onClick={signOut}>登出</a>
                    </li>
                </ul>
            </nav>
            <div className="conatiner todoListPage vhContainer">
                <div className="todoList_Content">
                    <div className="inputBox">
                        <input value={newTodo} type="text" placeholder="請輸入待辦事項" onChange={(e) => setNewTodo(e.target.value)} />
                        <button className="button_reset" onClick={addTodo}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
										{nothingTodo &&
											<div className="empty_container">
												<div className="empty_text">
													<span>目前尚無代辦事項</span>
												</div>
												<div className="empty_img">
													<img src={empty}  alt="empty_img"/>
												</div>
											</div>
										}
										{!nothingTodo &&
                    <div className="todoList_list">
                        <ul className="todoList_tab">
                            <li><div className={toggleState === '全部' ? 'active' : ''} onClick={(e) => changeStatus(e)}>全部</div></li>
                            <li><div className={toggleState === '待完成' ? 'active' : ''} onClick={(e) => changeStatus(e)}>待完成</div></li>
                            <li><div className={toggleState === '已完成' ? 'active' : ''} onClick={(e) => changeStatus(e)}>已完成</div></li>
                        </ul>
                        <div className="todoList_items">
                            <ul className="todoList_item">
                                {chooseState.map((item) => {
                                    return (
                                        <li key={item.id}>
                                            <label className="todoList_label">
                                                <input className="todoList_input" type="checkbox" value={item.status} checked={item.status} onChange={(e) => { toggleStatus(item.id, e) }} />
                                                <span>{item.content}</span>
                                            </label>
                                            <button className="button_reset" onClick={() => deleteTodo(item.id)}>
                                                <FontAwesomeIcon icon={faTimes} />
                                            </button>
                                        </li>)
                                })}
                            </ul>
                            <div className="todoList_statistics">
                                <p>{finishedCount}個已完成項目</p>
                                <a href='#' onClick={clearAllComplete}>清除已完成項目</a>
                            </div>
                        </div>
                    </div>
										}
                </div>
            </div>
        </div>
    )
}

export default Todo