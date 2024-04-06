type TitleSize = "xs" | "s" | "m" | "l" | "xl";
type TextSize = "xs" | "s" | "m" | "l" | "xl";
type ButtonAnimation =
  | "fade"
  | "translationY"
  | "translationX"
  | "anim-text"
  | "no-anim";
type BackgroundColor =
  | "very-light"
  | "light"
  | "dark"
  | "primary"
  | "secondary";
type TextColor = "grey" | "light" | "dark" | "primary" | "secondary";

interface navigationListOptions {
  titleSize: TitleSize;
  textSize: TextSize;
}

interface ButtonOptions {
  animation: ButtonAnimation;
}

interface ThemeState {
  navigationList: navigationListOptions;
  button: ButtonOptions;
}

export const useThemeStore = defineStore("theme", {
  state: (): ThemeState => ({
    navigationList: {
      titleSize: "xs",
      textSize: "m",
    },
    button: {
      animation: "translationY",
    },
  }),
});
