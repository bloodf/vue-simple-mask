import masker from "./index";
import tokens from "./tokens";

function event(name) {
  var evt = document.createEvent("Event");
  evt.initEvent(name, true, true);
  return evt;
}

export default function(el, binding) {
  let element = el;
  var config = binding.value;
  if (!config) return false;
  if (Array.isArray(config) || typeof config === "string") {
    config = {
      mask: config,
      tokens: tokens
    };
  } else if (typeof config === "object") {
    Object.assign(tokens, config.tokens);
  } else {
    throw new Error("Invalid input entered");
  }
  if (element.tagName.toLocaleUpperCase() !== "INPUT") {
    var els = element.getElementsByTagName("input");
    if (els.length !== 1) {
      throw new Error("v-mask directive requires 1 input, found " + els.length);
    } else {
      element = els[0];
    }
  }

  element.oninput = function(evt) {
    if (!evt.isTrusted) return;
    var position = element.selectionEnd;

    var digit = element.value[position - 1];
    element.value = masker(element.value, config.mask, true, config.tokens);
    while (
      position < element.value.length &&
      element.value.charAt(position - 1) !== digit
    ) {
      position++;
    }
    if (element === document.activeElement) {
      element.setSelectionRange(position, position);
      setTimeout(function() {
        element.setSelectionRange(position, position);
      }, 0);
    }
    element.dispatchEvent(event("input"));
  };

  var newDisplay = masker(element.value, config.mask, true, config.tokens);
  if (newDisplay !== element.value) {
    element.value = newDisplay;
    element.dispatchEvent(event("input"));
  }
}
