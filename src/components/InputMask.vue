<template>
<input type="text" v-mask="config" :value="display" v-on="listeners" :disabled="disabled" />
</template>

<script>
import mask from "../masker/directive";
import tokens from "../masker/tokens";
import masker from "../masker";
export default {
  name: "VueInputMask",
  props: {
    value: [String, Number],
    mask: {
      type: [String, Array],
      required: true
    },
    masked: {
      type: Boolean,
      default: false
    },
    tokens: {
      type: Object,
      default: () => tokens
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  directives: { mask },
  data() {
    return {
      lastValue: null,
      display: this.value
    };
  },
  watch: {
    value(newValue) {
      if (newValue !== this.lastValue) {
        this.display = newValue;
      }
    },
    masked() {
      this.refresh(this.display);
    }
  },
  computed: {
    config() {
      return {
        mask: this.mask,
        tokens: this.tokens,
        masked: this.masked
      };
    },
    listeners() {
      var self = this;
      return Object.assign({}, this.$listeners, {
        input: function(e) {
          if (e.isTrusted) return;
          self.refresh(e.target.value);
        }
      });
    }
  },
  methods: {
    refresh(value) {
      this.display = value;
      var value = masker(value, this.mask, this.masked, this.tokens);
      if (value !== this.lastValue) {
        this.lastValue = value;
        this.$emit("input", value);
      }
    }
  }
};
</script>
