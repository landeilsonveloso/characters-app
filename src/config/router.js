import { createStackNavigator } from "@react-navigation/stack"
import Home from "../screens/Home"
import AddCharacter from "../screens/AddCharacter"
import EditCharacter from "../screens/EditCharacter"

const Stack = createStackNavigator()

export default function Router() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="home" component={Home}/>
            <Stack.Screen name="addCharacter" component={AddCharacter}/>
            <Stack.Screen name="editCharacter" component={EditCharacter}/>
        </Stack.Navigator>
    )
}
