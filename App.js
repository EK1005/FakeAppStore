//Create basic navigation system in here 
//Import navigation component 
import { Text } from "react-native";
import { Provider, useSelector } from "react-redux";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import { store } from "./src/redux/store";

//Create navigation direct location file 
import CategoryScreen from "./src/screens/CategoryScreen";
import ProductDetailScreen from "./src/screens/ProductDetailScreen";
import ProductListScreen from "./src/screens/ProductListScreen";
import ShoppingCartScreen from "./src/screens/ShoppingCartScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ProductStack()
{
  return(
     <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="ProductList" component={ProductListScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  )
}

function MainTabs()
{
  const cartItems = useSelector((state) => state.cart.items);

  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
     <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#1F4E79",
        tabBarInactiveTintColor: "#777",
        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tab.Screen
        name="Products"
        component={ProductStack}
        options={{
          tabBarLabel: "Products",
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 22, color }}>🏠</Text>
          ),
        }}
      />

      <Tab.Screen
        name="ShoppingCart"
        component={ShoppingCartScreen}
        options={{
          tabBarLabel: "Shopping Cart",
          tabBarBadge: totalQuantity > 0 ? totalQuantity : undefined,
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 22, color }}>🛒</Text>
          ),
        }}
      />
    </Tab.Navigator>
  )
}


//create navigator instance 
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </Provider>
  );
}