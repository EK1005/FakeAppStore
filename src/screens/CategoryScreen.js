//In this class does obtain the categories with activity indicator and 
//direct to product list
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { colors, commonStyles } from "../styles/commonStyles";

export default function CategoryScreen({navigation})
{
    //Initialize the strings using by useState 
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try{
            const response = await fetch("https://fakestoreapi.com/products/categories");

            if(!response.ok)
            {
                throw new Error("Failed to fetch categories");
            }

            const data = await response.json();
            setCategories(data);
        }catch(error)
        {
            console.error("Category fetch error:", error);
        }finally
        {
            setIsLoading(false);
        }
        
    };

    const formatCategoryName = (c) => {
        if(c === "electronics") return "Electronics";
        if(c === "jewelery") return "Jewelery";
        if(c === "men's clothing") return "Men's Clothing";
        if(c === "women's clothing") return "Wemen's Clothing";
        return c;
    };

    //Crete UI in here 
    return(

        <View style={commonStyles.screen}>
            <View style={commonStyles.header}>
                <Text style={commonStyles.headerText}>Categories</Text>
            </View>

            <View style={styles.categoryContainer}>
                {isLoading ? (
                <ActivityIndicator size="large" color={colors.primary} />
                ) : (
                categories.map((category) => (
                <TouchableOpacity
                key={category}
                style={styles.categoryCard}
                onPress={() =>
                    navigation.navigate("ProductList", {
                        category: category,
                        title: formatCategoryName(category),
                    })
                }
                >
              <Text style={styles.categoryText}>
                {formatCategoryName(category)}
              </Text>
              <Text style={styles.categorySubText}>
                Tap to browse products
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  categoryContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },

  categoryCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
  },

  categoryText: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },

  categorySubText: {
    color: colors.mutedText,
    fontSize: 13,
    textAlign: "center",
    marginTop: 6,
  },
});


