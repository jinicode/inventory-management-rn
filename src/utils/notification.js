

import {showMessage, hideMessage} from "react-native-flash-message";




export const showSuccess = message => {
  showMessage({
    message: message,
    type: "success",
  });
}

export const showInfo = message => {
  showMessage({
    message: message,
    type: "info",
  });
}

export const showError = message => {
  showMessage({
    message: message,
    type: "danger",
  });
}