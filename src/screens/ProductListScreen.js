import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { colors, commonStyles } from "../styles/commonStyles";

export default function ProductListScreen({ route, navigation }) {
    //collect sent data from CategoryScreen in here 
    const { category, title } = route.params;
    //managing screen condition in here.
    //Set initialize empty first . collect product from API
    const [products, setProducts] = useState([]);
    //Managinf loading condition. Set true before API loading at beggining 
    const [isLoading, setIsLoading] = useState(true);

    //Set use effect to execute fetchProducts only once when screen displayed 
    useEffect(() => {
        fetchProducts();
    }, []);

    //Create function which is collecting product from API 
    const fetchProducts = async () => {
        try {
            //Access to API 
            const response = await fetch(
            `https://fakestoreapi.com/products/category/${encodeURIComponent(
            category
            )}`
        );

        //Error handling 
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
        } catch (error) {
            console.error("Product list fetch error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    //Create function to show the one product list display in the flat list
    const renderProduct = ({ item }) => (
        //When user click product card, user will be directed to detail screen
        <TouchableOpacity
            style={styles.productCard}
            onPress={() =>
            navigation.navigate("ProductDetail", {
            productId: item.id,
            })
        }
        >
            {/* showing the product image in here */}
            <Image source={{ uri: item.image }} style={styles.productImage} />
            {/* showing the product name and its price */}
            <View style={styles.productInfo}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
        </View>
        </TouchableOpacity>
     );

    return (
        <View style={commonStyles.screen}>
            <View style={commonStyles.header}>
                <Text style={commonStyles.headerText}>{title}</Text>
            </View>

            <TouchableOpacity
            style={commonStyles.outlineButton}
            onPress={() => navigation.goBack()}
            >
            <Text style={commonStyles.outlineButtonText}>Back</Text>
            </TouchableOpacity>

             <View style={styles.listContainer}>
                {isLoading ? (
                <ActivityIndicator size="large" color={colors.primary} />
                ) : (
                <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderProduct}
                contentContainerStyle={styles.listContent}
            />
        )}
      </View>
        </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginTop: 16,
  },

  listContent: {
    paddingBottom: 20,
  },

  productCard: {
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
    width: 95,
    height: 95,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },

  productImage: {
    width: 78,
    height: 78,
    resizeMode: "contain",
  },

  productInfo: {
    flex: 1,
    justifyContent: "center",
  },

  productTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 8,
  },

  productPrice: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },

  detailHint: {
    color: colors.mutedText,
    fontSize: 12,
  },
});