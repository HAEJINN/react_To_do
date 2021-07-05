import { Button } from '@material-ui/core';
import { useState, useRef } from 'react';
// Todo List 만들기.

// 할 일.

// 1. Todo 추가하기 (Todo를 추가할 Input, 저장할 Button)
// 2. Todo 삭제, 수정(Done, NotDone 체크)
// 3. 추가된 Todo를 보여줄 목록

// Todo 객체는 어떤 것들이 필요한가?
// id ( integer ) // 유니크해야함!!
// userId (integer) // 누구의 Todo인지
// content 내용 ( string )
// done  ( boolean )
// createdAt 생성 시간. ( Date )
// updatedAt 수정 시간. ( Date )

// https://material-ui.com/
// https://react-bootstrap.github.io/components/buttons/

function App() {
  const todoIdRef = useRef(1);
  // const [가져오기, 쓰기] = useState(초기값)
  // const [getter, setter] = useState(initialValue)
  const [todos, setTodos] = useState([]); // todos변화를 감지하고, 화면을 다시 그리기 시도.
  const inputRef = useRef(null); // useRef는 안 쪽의 값이 변해도, 화면을 다시 그리지 않음. But 상태는 계속 저장.
  
  const addTodo = (e) => {
    e.preventDefault();
    const currentInputText = inputRef.current.value; // content
    
    // JSON -> javascript object 표현식
    const newTodo = {
      id: todoIdRef.current++, // todoIdRef의 현재값을 ID에 저장하고, todoIdRef의 현재값을 1 늘린다.
      content: currentInputText,
      done: false,
      createdAt: new Date(),
      updateAt: new Date()
    }

    // Todo가 뜨기 전에 Login 화면
    // Login 시 Todo화면을 그린다. And 이미 들고 있는 Todo들을 그려준다.
    // server.post("createUrl", data: { content: content}, header: { accessToken: myAccessToken })
    //       .then(result => setTodos([...todos, result]))

    setTodos([...todos, newTodo]);
    inputRef.current.value = null;
  }

  const deleteTodo = (id) => {
    console.log(todos);
    const todosAfterDeleted = todos.filter(todo => todo.id !== id)
    console.log(todosAfterDeleted);
    setTodos(todosAfterDeleted)
    console.log("투두 삭제됨!!!!!!!")

    return true
  }
  
  const toggleTodo = (id) => {
    // setTodos

    // todos의 배열에서 todo.id == id 인 투두를 찾아서 done을 바꾸고
    // 바꿔진 새로운 todos를 setTodos해준다.

    // forEach -> List의 원소에 함수를 실행하고, 그 List를 돌려준다.
    // map -> List의 원소에 함수를 실행하고, 새로운 List를 만들어준다.

    // JavaScript는 함수형을 지향.
    // 이미 존재하는 객체의 값을 바꾸는 것을 피함.
    // Side Effect를 피하기 위함. 
    const newTodos = todos.map(todo => {
      if(todo.id === id) {
        const newTodo = { ...todo };
        newTodo.done = !newTodo.done;
        return newTodo;
      } else {
        return todo;
      }
    })
    // [o, o, o, o, o]
    // [o, o, x, o, o]
    setTodos(newTodos)
  }
  
  return (
    <div className="App">
      <input type="text" ref={inputRef}/>
      
      <Button variant="outlined" color="primary" onClick={(event) => addTodo(event)}>
        추가하기
      </Button>
      <ul>
        {todos.map(todo => 
          <li key={"todo_li_" + todo.id}> 
            ID:{todo.id} | {todo.content} | {todo.done ? "O" : "X" } 
            <button onClick={(event) => toggleTodo(todo.id)}>
              {todo.done? "미완료" : "완료" }
            </button>
            <button onClick={(event) => deleteTodo(todo.id)}>삭제</button>
            {/* <button onClick={deleteTodo(todo.id)}>삭제</button> */}
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
