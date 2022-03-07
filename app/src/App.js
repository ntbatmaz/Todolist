import React, { useState, useEffect } from "react";
import axios from "axios";

import Form from "./components/Form";
import Section from "./components/Section";
import List from "./components/List";

const appTitle = "To-Do App";

const App = () => {
  const [todoList, setTodoList] = useState([])

  useEffect(() => {
    async function fetchData() { 
      const { data } = await axios.get("http://localhost:3030/todos/");
      setTodoList(data);
    }

    fetchData();
  }, []);

  const addTodo = async (item) => {
    const { data } = await axios.post("http://localhost:3030/todos/", item);
    setTodoList((oldList) => [...oldList, data]);
  };

  const removeTodo = async (id) => {
    await axios.delete(`http://localhost:3030/todos/${id}`)
    setTodoList((oldList) => oldList.filter((item) => item._id !== id) );
  };

  const editTodo = async (id, item) => {
    axios.put(`http://localhost:3030/todos/${id}`, item);
  }
  
  return( 
    <div className ="ui container center aligned"> 
      <Section>
        <h1>{appTitle}</h1>
      </Section>

      <Section>
       <Form addTodo={addTodo} />
     </Section>

     <Section>
       <List 
        editTodoListProp={editTodo}
        removeTodoListProp={removeTodo} 
        list={todoList} 
       />
     </Section>
  
    </div>
  );  
};

export default App;