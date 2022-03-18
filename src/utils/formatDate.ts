import { Platform } from "react-native";
import { format, addDays } from "date-fns";

export function getPlatformDate(date: Date) {
  if (Platform.OS === "ios") {
    return addDays(date, 1);
  } else {
    return addDays(date, 1);
  }
}

/**
 * Formata a data passada
 * @param date - Data padrão do javascript
 * @returns uma data no formato dd/MM/yyyy
 */
const formatDate = (date: Date) => format(getPlatformDate(date), "dd/MM/yyyy");

export default formatDate;
