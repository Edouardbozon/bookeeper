export default class Money {
  constructor(amount, currency) {
    if (typeof amount !== "number") {
      throw new Error("Amount must be a number to instantiate Money");
    }
    this.amount = amount.toFixed(2);

    if (currency === "EUR") {
      this.currency = "€";
    } else if (currency === "USD") {
      this.currency = "$";
    } else {
      throw new Error("Unsupported currency");
    }
  }

  toString() {
    return `${this.amount} ${this.currency}`;
  }
}
