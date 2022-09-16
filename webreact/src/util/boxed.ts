export class Int64 {
  number: number;

  constructor(number: number) {
    this.number = number;
  }

  toString(): string {
    if (isNaN(this.number)) {
      return "";
    }
    return this.number.toString()
  }
}

export class Float {
  private readonly number: number | string;

  constructor(n: number | string) {
    this.number = n;
  }

  toString(): string {
    if (typeof this.number == "string") {
      let number = parseFloat(this.number);
      if (isNaN(number)) {
        return "";
      }
      return this.number;
    }
    if (isNaN(this.number)) {
      return "";
    }
    return this.number.toString()
  }
}

export function int64(n: number | string) {
  if (typeof n == "string") {
    return new Int64(parseInt(n));
  }
  return new Int64(n);
}

export function float(n: number | string) {
  if (typeof n == "string") {
    return new Float(n);
  }
  return new Float(n);
}
