// utils/toast.ts
import { View, Text } from "react-native";

const getToastStyle = (type) => {
  switch (type) {
    case "success":
      return { bg: "#28a745", icon: "✅ Succès 🎉" };
    case "error":
      return { bg: "#dc3545", icon: "❌ Erreur" };
    case "info":
      return { bg: "#007bff", icon: "ℹ️ Info" };
    case "warning":
      return { bg: "#ffc107", icon: "⚠️ Attention" };
    default:
      return { bg: "#333", icon: "🔔 Notification" };
  }
};

export const toastConfig = {
  success: (props) => {
    const { bg, icon } = getToastStyle("success");
    return (
      <View
        style={{
          backgroundColor: bg,
          borderRadius: 12,
          padding: 15,
          marginHorizontal: 20,
          marginTop: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },

          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 6,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          {icon}
        </Text>
        <Text style={{ fontSize: 16, color: "white", marginTop: 4 }}>
          {props.text2}
        </Text>
      </View>
    );
  },
  error: (props) => {
    const { bg, icon } = getToastStyle("error");
    return (
      <View
        style={{
          backgroundColor: bg,
          borderRadius: 12,
          padding: 15,
          marginHorizontal: 20,
          marginTop: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 6,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          {icon}
        </Text>
        <Text style={{ fontSize: 16, color: "white", marginTop: 4 }}>
          {props.text2}
        </Text>
      </View>
    );
  },
  info: (props) => {
    const { bg, icon } = getToastStyle("info");
    return (
      <View
        style={{
          backgroundColor: bg,
          borderRadius: 12,
          padding: 15,
          marginHorizontal: 20,
          marginTop: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 6,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          {icon}
        </Text>
        <Text style={{ fontSize: 16, color: "white", marginTop: 4 }}>
          {props.text2}
        </Text>
      </View>
    );
  },
  warning: (props) => {
    const { bg, icon } = getToastStyle("warning");
    return (
      <View
        style={{
          backgroundColor: bg,
          borderRadius: 12,
          padding: 15,
          marginHorizontal: 20,
          marginTop: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 6,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          {icon}
        </Text>
        <Text style={{ fontSize: 16, color: "white", marginTop: 4 }}>
          {props.text2}
        </Text>
      </View>
    );
  },
};
