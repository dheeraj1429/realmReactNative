import React, { useEffect, useState } from 'react';
import { Realm } from 'realm';
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Text,
  TextField,
} from 'rn-nex-ui/src';
import RealmDb from '../../models/config';

type Todo = {
  _id: Realm.BSON.ObjectID;
  title: string;
  isCompleted: boolean;
  description?: string;
};

export const Home = () => {
  const [todoName, setTodoName] = useState<string | undefined>(undefined);
  const [todoDescription, setTodoDescription] = useState<string | undefined>(
    undefined,
  );
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const fetchTodoList = async () => {
    try {
      const todoList = await RealmDb.getTodoList<Todo>();
      const updateTodoList = () => {
        setTodoList(Array.from(todoList));
      };

      todoList.addListener(updateTodoList);
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeHandler = (text: string, type: 'name' | 'description') => {
    if (type === 'name') {
      setTodoName(text);
    } else {
      setTodoDescription(text);
    }
  };

  const addTodoHandler = () => {
    if (todoName) {
      RealmDb.addTodo(todoName, todoDescription);
    }
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

  return (
    <Container>
      <Box sx={{ d: 'flex', items: 'center', fDirection: 'column', gap: 15 }}>
        <TextField
          placeholder="Toto name"
          value={todoName}
          onChangeText={event => onChangeHandler(event, 'name')}
        />
        <TextField
          placeholder="Toto description"
          value={todoDescription}
          onChangeText={event => onChangeHandler(event, 'description')}
        />
      </Box>
      <Button
        fullWidth
        buttonColor="primary"
        onPress={addTodoHandler}
        sx={{ mt: 10 }}>
        <Text mode="light">Save todo</Text>
      </Button>
      <Box sx={{ mt: 10 }}>
        <List>
          {todoList.length
            ? todoList.map((item, index) => (
                <ListItem
                  key={item._id.toString() + index}
                  onPress={() => console.log('done')}>
                  <ListItemText
                    primary={item.title}
                    secondary={item.description}
                  />
                </ListItem>
              ))
            : null}
        </List>
      </Box>
    </Container>
  );
};
