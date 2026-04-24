import { StyleSheet } from "react-native";

export const colors = {
  background: "#F7F3E9",
  card: "#FFFFFF",
  primary: "#1F4E79",
  secondary: "#2E86AB",
  accent: "#4CAF50",
  text: "#2D2D2D",
  mutedText: "#666666",
  border: "#D6D0C4",
};

export const commonStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 50
  },

  header: {
    backgroundColor: colors.primary,
    paddingVertical: 30,
    borderRadius: 14,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },

  headerText: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center",
  },

  card: {
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

  button: {
    backgroundColor: colors.secondary,
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },

  outlineButton: {
    borderWidth: 1,
    borderColor: colors.secondary,
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  outlineButtonText: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 15,
  },
});