import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Alert, TextInput, ImageBackground, KeyboardAvoidingView } from 'react-native';
import Constants from "expo-constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator, Header, CardStyleInterpolators,} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign } from "@expo/vector-icons";
import { TODOS } from './data';
import SingleTodoScreen from './SingleTodoScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const routeIcon = {
  Complete: "smileo",
  All: "menufold",
  Active: "meh",
};

const TodoItem = (props) => {
  const statusStyle = {
    backgroundColor: props.todo.status === 'Done' ? '#edcfa9' : '#e89f71'
  };
  const onLongPress = todo => {
    const prompt = `"${todo.body}"`;
    Alert.alert(
      'Delete your todo?',
      prompt,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => props.onDeleteTodo(todo.id) }
      ],
      { cancelable: true }
    );
  };
  
  return (
    <TouchableOpacity key={props.todo.body} 
    style={ [styles.todoItem, statusStyle]}
    onLongPress={() => onLongPress(props.todo)}
    onPress={()=> {props.onToggleTodo(props.todo.id); props.showTodo(props.todo)}}
    >
      <Text style={styles.todoText}>{props.idx +1}: {props.todo.body}</Text>
    </TouchableOpacity>
  );
};

export default function App() {
  const [todoList, setTodoList] = useState(TODOS);
  const [todoBody, setTodoBody] = useState('');
  
  const onToggleTodo = id =>{
    const todo = todoList.find(todo => todo.id ===id);
    todo.status = todo.status==="Done"? "Active" : "Done";
    const foundIndex = todoList.findIndex ( todo => todo.id ===id);
    todoList[foundIndex] = todo;
    const newTodoList = [...todoList];
    setTodoList(newTodoList);
    // console.log(todoList);
  }
  const onDeleteTodo = id => {
    console.log(id);
    const newTodoList = todoList.filter(todo => todo.id !== id);
    setTodoList(newTodoList);
    setTodoList((value)=>{
      console.log(value);
      return value;
    })
  };

  const onSubmitTodo = () => {
    const newTodo ={
      body: todoBody,
      status: 'Active',
      id: todoList.length + 1,
    };
    const newTodoList=[...todoList, newTodo];
    setTodoList(newTodoList);
    setTodoBody('');
  };

  const SingleTodoScreen = ({route}) => {
    return (
      <View style={styles.singleTodo}>
        <Text style={{fontSize: 20}}>{route.params?.id}. {route.params?.status}</Text>
        <Text style={{fontSize: 25, fontWeight: 'bold', textAlign:'center'}}>{route.params?.body}</Text>
      </View>
    );
  };
  const CompleteStack = () => {
    return (
      <Stack.Navigator initialRouteName="Complete"
      screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }}
      >
        <Stack.Screen name="Complete" component={Complete} />
        <Stack.Screen name="SingleTodoScreen" component={SingleTodoScreen} />
      </Stack.Navigator>
    );
  };

  const Complete = ({navigation}) => {
    const showTodo = todo => {
      navigation.navigate("SingleTodoScreen", todo);
      console.log("show me pls");
    }
    return (
      <ImageBackground style={styles.imgBack} 
      resizeMode='cover'
        source={require('./assets/1.jpg')}
      >
        <ScrollView >
          <View style={styles.container}>
          <View style={{width: '90%'}}>
          {todoList.map((todo, idx) => {
            if(todo.status=="Done"){
              return (<TodoItem key={todo.body} todo={todo} idx={idx} 
                onToggleTodo={onToggleTodo} onDeleteTodo={onDeleteTodo}
                showTodo={showTodo}
                />)
            }
          })}
          </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  };
  
  const ActiveStack= () => {
    return (
      <Stack.Navigator initialRouteName="Active">
        <Stack.Screen name="Activve" component={Active} />
        <Stack.Screen name="SingleTodoScreen" component={SingleTodoScreen} />
      </Stack.Navigator>
    );
  };

  const Active = ({navigation}) => {
    const showTodo = todo => {
      navigation.navigate("SingleTodoScreen", todo);
      console.log("show me pls");
    }
    return (
      <ImageBackground style={styles.imgBack} 
      resizeMode='cover'
        source={require('./assets/1.jpg')}
      >
        <ScrollView >
          <View style={styles.container}>
          <View style={{width: '90%'}}>
          {todoList.map((todo, idx) => {
            if(todo.status=="Active"){
              return (<TodoItem key={todo.body} todo={todo} idx={idx} 
                onToggleTodo={onToggleTodo} onDeleteTodo={onDeleteTodo}
                showTodo={showTodo}
                />)
            }
          })}
          </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  };

  const AllStack = () => {
    return (
      <Stack.Navigator initialRouteName="All">
        <Stack.Screen name="All" component={All} />
        <Stack.Screen name="SingleTodoScreen" component={SingleTodoScreen} />
      </Stack.Navigator>
    );
  }; 
  const All = ({navigation}) => {
    const showTodo = todo => {
      navigation.navigate("SingleTodoScreen", todo);
      console.log("show me pls");
    }
    return (
      <ImageBackground style={styles.imgBack} 
      resizeMode='cover'
        source={require('./assets/1.jpg')}
      >
      <ScrollView >
      <KeyboardAvoidingView
      style = {{ flex: 1,
        justifyContent: 'flex-end',
         }}
         behavior="position"
      // {...(Platform.OS === 'ios' && { behavior: 'padding' })}
      >
      <View style={styles.container}>
        <View style={{width: '90%'}}>
        {todoList.map((todo, idx) => {
          return (<TodoItem key={todo.body} todo={todo} idx={idx} 
          onToggleTodo={onToggleTodo} onDeleteTodo={onDeleteTodo} 
          showTodo={showTodo}
          />)
        })}
        </View>
        <View style={styles.inputContainer}>
          <TextInput 
            autoCorrect={false}
            value={todoBody}
            style={styles.todoInput}
            onChangeText={text =>setTodoBody(text)}
            // placeholder="Type here!"
          />
          <TouchableOpacity style={styles.buttonSubmit} onPress={onSubmitTodo}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Submit</Text>
          </TouchableOpacity>
          
        </View>
      </View>
      
      </KeyboardAvoidingView>
      </ScrollView>
      </ImageBackground>
    );
  };
  return (
    <NavigationContainer initialRouteName="All">
      <Tab.Navigator 
      screenOptions={({route})=>({
        tabBarIcon: ({focused}) => (
          <AntDesign
          name={routeIcon[route.name]}
          size={24}
          color={focused ? "#aa4a30":"grey"}/>
        ),
      })}
      tabBarOptions={{
        activeTintColor: '#aa4a30',
        inactiveTintColor: 'gray',
      }}
      >
        <Tab.Screen name="Complete" component={CompleteStack}/>
        <Tab.Screen name="All" component={AllStack}/>
        <Tab.Screen name="Active" component={ActiveStack}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems:'center',
    marginTop: Constants.statusBarHeight,
    
  },
  todoItem: {
    margin: 5,
    padding: 10,
    width: '95%',
    minHeight: 20,
    color: 'white',
    borderRadius: 5,
    // flexWrap: 'wrap'
  },
  todoText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
  todoInput: {
    width: '98%',
    minHeight: 40,
    color: '#aa4a30',
    borderWidth: 1,
    borderColor: '#aa4a30',
    borderRadius: 10,
    alignSelf:'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  buttonSubmit:{
    height: 50,
    width: '50%',
    backgroundColor: '#d57149',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingHorizontal: 40,
  },
  inputContainer: {
    flex: 1,
    width: '90%',
    marginTop: 20,
    marginBottom: '10%',
    // justifyContent: 'center',
    justifyContent: "flex-end",
    alignItems:'center'
  },
  imgBack:{
    flex: 1,
    width: '100%',
    height:'100%',
  },
  singleTodo:{
    flex: 1,
    alignItems:'center',
    marginTop: Constants.statusBarHeight,
    fontSize: 20,
    justifyContent: 'center',
    flexDirection: 'column',
  }
});
