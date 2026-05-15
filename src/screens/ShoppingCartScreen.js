// This class for showing the redux cart UI in the screen
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import {
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
} from "../redux/cartSlice";

import { colors, commonStyles } from "../styles/commonStyles";

export default function ShoppingCartScreen() {
    //Prepare for sending order to Redux using by dispatch
    const dispatch = useDispatch();
    //Get the cart from redux 
    const cartItems = useSelector((state) => state.cart.items);
    //Calculate total of quantity 
    const totalItems = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    //Calculate total of price in the cart
    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
  // Create FlatList UI to show the each item which is selected in the cart
  const renderCartItem = ({ item }) => (
    //Show the API images 
    <View style={styles.cartCard}>
      <View style={styles.imageBox}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
      </View>

      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.title}
        </Text>

        <Text style={styles.itemPrice}>${item.price}</Text>

        <View style={styles.quantityRow}>
          <TouchableOpacity
            style={styles.quantityButton}
            //import created decrease method in this line to make it activate 
            onPress={() => dispatch(decreaseQuantity(item.id))}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantityText}>{item.quantity}</Text>

          <TouchableOpacity
            style={styles.quantityButton}
            //import created increase method in this line to make it activate 
            onPress={() => dispatch(increaseQuantity(item.id))}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => dispatch(removeFromCart(item.id))}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={commonStyles.screen}>
      <View style={commonStyles.header}>
        <Text style={commonStyles.headerText}>Shopping Cart</Text>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>Your shopping cart is empty</Text>
        </View>
      ) : (
        <>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryText}>
              Total Items: {totalItems}
            </Text>
            <Text style={styles.summaryText}>
              Total Price: ${totalPrice.toFixed(2)}
            </Text>
          </View>

          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCartItem}
            contentContainerStyle={styles.listContent}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    color: colors.mutedText,
    fontSize: 18,
    fontWeight: "bold",
  },

  summaryCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },

  summaryText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },

  listContent: {
    paddingBottom: 20,
  },

  cartCard: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
  },

  imageBox: {
    width: 90,
    height: 90,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },

  productImage: {
    width: 72,
    height: 72,
    resizeMode: "contain",
  },

  itemInfo: {
    flex: 1,
  },

  itemTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
  },

  itemPrice: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },

  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  quantityButton: {
    backgroundColor: colors.secondary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  quantityButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  quantityText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 14,
  },

  removeButton: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.secondary,
  },

  removeButtonText: {
    color: colors.secondary,
    fontSize: 13,
    fontWeight: "bold",
  },
});