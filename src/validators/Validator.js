export default class Field {
    constructor({ name, value, required = true, minLength = 0, pattern }) {
      this.name = name;
      this.value = value;
      this.errorClassList = [];
      this.errors = [];
      this.validations = {};
      if (required) this.validations.required = required;
      if (minLength) this.validations.minLength = minLength;
      if (pattern) this.validations.pattern = pattern;
    }
  
    isValid(value, ...errorClassList) {
      let valid = true;
  
      this.errorClassList = [];
      this.errors = [];
  
      for (const validation in this.validations) {
        if (validation === "required" && this.validations[validation]) {
          if (!value) {
            valid = false;
            this.errorClassList.push(...errorClassList);
            this.errors.push(`${this.name} is required`);
          } else {
            this.errorClassList.push("is-valid");
          }
        }
        if (validation === "pattern") {
          if (!this.validations.pattern.test(value)) {
            valid = false;
            this.errorClassList.push(...errorClassList);
            this.errors.push(`${this.name} is invalid`);
          } else {
            this.errorClassList.push("is-valid");
          }
        }
  
        if (validation === "minLength" && this.validations[validation] > 0) {
          const size = this.validations[validation];
          if (value.length < size) {
            valid = false;
            this.errorClassList.push(...errorClassList);
            this.errors.push(`${this.name} should be no less than ${size} chars`);
          } else {
            this.errorClassList.push("is-valid");
          }
        }
      }
      return valid;
    }
  }