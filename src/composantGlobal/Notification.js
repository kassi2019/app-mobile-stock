import Toast from "react-native-toast-message";

// ✅ Toast de succès
export const messageSucces = (message) => {
  Toast.show({
    type: "success",
    text1: "✅ Succès 🎉",
    text2: message,
    position: "top",
    visibilityTime: 8000, // un peu plus long
    topOffset: 50, // espace par rapport au haut
    props: {}, // tu peux passer des props custom si tu veux un design perso
  });
};

// ❌ Toast d'erreur
export const messageErreur = (message) => {
  Toast.show({
    type: "error",
    text1: "Erreur ❌",
    text2: message,
    position: "top",
    visibilityTime: 7000,
  });
};

// ℹ️ Toast d'info
export const messageInfo = (message) => {
  Toast.show({
    type: "info",
    text1: "Info ℹ️",
    text2: message,
    position: "top",
    visibilityTime: 4000,
  });
};

// ⚠️ Toast d’avertissement
export const messageWarning = (message) => {
  Toast.show({
    type: "info",
    text1: "Attention ⚠️",
    text2: message,
    position: "top",
    visibilityTime: 4000,
  });
};

// 🗑️ Toast de suppression
export const messageSuppression = (message) => {
  Toast.show({
    type: "error",
    text1: "Suppression 🗑️",
    text2: message,
    position: "top",
    visibilityTime: 4000,
  });
};
