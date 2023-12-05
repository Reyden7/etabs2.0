import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddPhotoScreen from './screens/AddPhotoScreen';
import ChordsScreen from './screens/ChordsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="AddPhoto" component={AddPhotoScreen} />
    <Stack.Screen name="Chords" component={ChordsScreen} />
  </Stack.Navigator>
);

const Navigation = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={MainStack} />
    {/* Ajoutez d'autres onglets si nécessaire */}
  </Tab.Navigator>
);

export default Navigation;