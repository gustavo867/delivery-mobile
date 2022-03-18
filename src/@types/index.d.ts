import "styled-components";
import { lightTheme, darkTheme } from "../theme";

declare module "styled-components" {
  type ThemeType = typeof lightTheme & typeof darkTheme;

  export interface DefaultTheme extends ThemeType {
    name: "dark" | "light" | string;
  }
}
