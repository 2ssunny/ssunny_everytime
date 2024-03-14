import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Home from "../Screens/Home.js"
import About from "../Screens/About.js"

import Board from "../Screens/Board/Board.js"
import BoardEdit from "../Screens/Board/BoardEdit.js"
import BoardPost from "../Screens/Board/BoardPost.js"
import BoardView from "../Screens/Board/BoardView.js"

import Login from "../Screens/Login/Login.js"
import Register from "../Screens/Login/Register.js"

import ScheduleCheck from "../Screens/Schedule/ScheduleCheck.js"
import ScheduleUpdate from "../Screens/Schedule/ScheduleUpdate.js"
import ScheduleUpload from "../Screens/Schedule/ScheduleUpload.js"
import ScheduleView from "../Screens/Schedule/ScheduleView.js"


const Navigation=()=> {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Group>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Profile" component={Profile} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation