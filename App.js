import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from "expo-constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign } from "@expo/vector-icons";
import { TODOS } from './data';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Complete = () => {
  return (
    <Text>Complete</Text>
  );
};

const Active = () => {
  return (
    <Text>Active</Text>
  );
};
const routeIcon = {
  Complete: "downcircleo",
  All: "menufold",
  Active: "smileo",
};
const TodoItem = props => {
  const statusStyle = {
    backgroundColor: props.todo.status === 'Done' ? 'blue' : 'green'
  };
  return (
    <TouchableOpacity key={props.todo.body} 
    style={ [styles.todoItem, statusStyle]}
    onPress={()=> props.onToggleTodo(props.todo.id)}>
      <Text>{props.idx +1}: {props.todo.body}</Text>
    </TouchableOpacity>
  );
};

export default function App() {
  const [todoList, setTodoList] = useState(TODOS);
  const onToggleTodo = id =>{
    const todo = todoList.find(todo => todo.id ===id);
    todo.status = todo.status==="Done"? "Active" : "Done";
    const foundIndex = todoList.findIndex ( todo => todo.id ===id);
    todoList[foundIndex] = todo;
    const newTodoList = [...todoList];
    setTodoList(newTodoList);
  }
  const All = () => {
    return (
      // <Text>All</Text>
      <View>
      {TODOS.map((todo, idx) => {
        return <TodoItem key={todo.body} todo={todo} idx={idx} 
        onToggleTodo={onToggleTodo} />
      })}
      </View>
    );
  };
  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({route})=>({
        tabBarIcon: ({focused}) => (
          <AntDesign
          name={routeIcon[route.name]}
          size={24}
          color={focused ? "blue":"grey"}/>
        ),
      })}>
        <Tab.Screen name="Complete" component={Complete}/>
        <Tab.Screen name="All" component={All}/>
        <Tab.Screen name="Active" component={Active}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight,
  },
  todoItem: {
    margin: 5,
    padding: 10,
    width: '95%',
    minHeight: 20,
    color: 'white',
    borderRadius: 5,
    flexWrap: 'wrap'
  },
  todoText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  }
});
