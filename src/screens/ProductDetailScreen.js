import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { colors, commonStyles } from "../styles/commonStyles";

export default function ProductDetailScreen({ route, navigation }) {
  const { productId } = route.params;

  //Create array to store the product detail 
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //Execute fetchProducctDetail one when screen opens
  useEffect(() => {
    fetchProductDetail();
  }, []);

  const fetchProductDetail = async () => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch product detail");
      }

      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Product detail fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  //When we cound not find product, just show product not found 
  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={commonStyles.screen}>
      <View style={commonStyles.header}>
        <Text style={commonStyles.headerText}>Product Details</Text>
      </View>

       <View style={styles.detailCard}>
        <View style={styles.imageBox}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
        </View>

        <Text style={styles.productTitle}>{product.title}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Rating: {product.rating?.rate}</Text>
          <Text style={styles.infoText}>Count: {product.rating?.count}</Text>
        </View>

        <Text style={styles.priceText}>${product.price}</Text>

        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{product.description}</Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={commonStyles.outlineButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={commonStyles.outlineButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={commonStyles.button}>
            <Text style={commonStyles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centerBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  errorText: {
    color: colors.text,
    fontSize: 16,
  },

  detailCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 30,
  },

  imageBox: {
    height: 230,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  productImage: {
    width: 190,
    height: 190,
    resizeMode: "contain",
  },

  productTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F2F0EA",
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
  },

  infoText: {
    color: colors.mutedText,
    fontSize: 14,
    fontWeight: "600",
  },

  priceText: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },

  descriptionBox: {
    backgroundColor: "#F9F7F2",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 18,
  },

  descriptionTitle: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },

  descriptionText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 21,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
});