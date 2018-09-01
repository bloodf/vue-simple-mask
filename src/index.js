import tokens from "./masker/tokens";
import mask from "./masker/directive";
import InputMask from "./components/InputMask";

const LibraryModule = {
  InputMask,

  install(Vue) {
    // Register components with vue
    Vue.component("vue-input-mask", InputMask);
    Vue.directive("mask", mask);
  }
};

// Export library
export default LibraryModule;

// Export components
export { InputMask, mask, tokens };
