import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from "react";
import InputField from "./Components/InputField";
import Button from "./Components/Button";
import TodoItem from "./Components/TodoItem";
import {API_URL} from "./common";

const fetchTodos = async () => {
  const response = await fetch(API_URL + '/todo');

  if (!response.ok) {
    throw Error('Could not get data.');
  }

  return await response.json();
}

interface Todo {
  id: number,
  title: string,
  done: boolean,
  created_at: Date,
  updated_at: Date,
}

export default function App() {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos()
        .then(res => {
          setTodos(res.data);
        })
        .catch(error => {
          console.log(error);
        })
  }, []);

  const handleAddTodo = async () => {
    const response = await fetch(`${API_URL}/todo`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title
      })
    });

    const result = await response.json();

    if (result.success) {
      setTodos(prevState => [...prevState, result.data]);
      setTitle('');
    } else {
      alert(result.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <InputField
            onChange={setTitle}
            onSubmit={handleAddTodo}
            value={title}
            placeholder="Todo Title"
        />
        <Button onPress={handleAddTodo} label="Add Todo" />
      </View>

      <View style={styles.todoList}>
        {todos.length > 0? (
            <FlatList
              data={todos}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                  <TodoItem
                      onMarkDone={id => fetchTodos().then(res => setTodos(res.data))}
                      onDelete={id => setTodos(prevState => prevState.filter(todo => todo.id !== id))}
                      id={item.id}
                      label={item.title}
                      done={item.done}
                  />
                )}
            />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 25,
    flex: 1,
    backgroundColor: '#FBFCFE',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  form: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 10,
    paddingBottom: 30,
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#dedede'
  },
  todoList: {
    width: '100%',
    paddingBottom: 200
  }
});
