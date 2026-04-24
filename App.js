//Create basic navigation system in here 
//Import navigation component 
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


//Create navigation direct location file 
import CategoryScreen from "./src/screens/CategoryScreen";
import ProductDetailScreen from "./src/screens/ProductDetailScreen";
import ProductListScreen from "./src/screens/ProductListScreen";

const Stack = createNativeStackNavigator();

//create navigator instance 
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Category"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="ProductList" component={ProductListScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}