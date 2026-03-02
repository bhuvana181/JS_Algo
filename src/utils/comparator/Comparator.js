// edited by sarors
// github.com/saarors
export default class Comparator {
  /**
   * Creates a Comparator instance.
   * @param {Function} [compareFunction] - Optional custom compare function.
   * The function must return:
   *   - negative number if a < b
   *   - 0 if a === b
   *   - positive number if a > b
   */
  constructor(compareFunction) {
    this.setCompareFunction(compareFunction);
  }

  /**
   * Sets or replaces the comparison function.
   * @param {Function} [compareFunction]
   */
  setCompareFunction(compareFunction) {
    if (compareFunction && typeof compareFunction !== 'function') {
      throw new TypeError('Compare function must be a function');
    }

    this.compare = compareFunction || Comparator.defaultCompareFunction;
  }

  /**
   * Default comparison function.
   * Assumes values are numbers, strings, or comparable primitives.
   *
   * @param {*} a
   * @param {*} b
   * @returns {number}
   */
  static defaultCompareFunction(a, b) {
    if (a === b) return 0;

    if (a == null) return -1;
    if (b == null) return 1;

    return a < b ? -1 : 1;
  }

  /**
   * Checks if two values are equal.
   * @param {*} a
   * @param {*} b
   * @returns {boolean}
   */
  equal(a, b) {
    return this.compare(a, b) === 0;
  }

  /**
   * Checks if a is less than b.
   * @param {*} a
   * @param {*} b
   * @returns {boolean}
   */
  lessThan(a, b) {
    return this.compare(a, b) < 0;
  }

  /**
   * Checks if a is greater than b.
   * @param {*} a
   * @param {*} b
   * @returns {boolean}
   */
  greaterThan(a, b) {
    return this.compare(a, b) > 0;
  }

  /**
   * Checks if a is less than or equal to b.
   * @param {*} a
   * @param {*} b
   * @returns {boolean}
   */
  lessThanOrEqual(a, b) {
    return this.compare(a, b) <= 0;
  }

  /**
   * Checks if a is greater than or equal to b.
   * @param {*} a
   * @param {*} b
   * @returns {boolean}
   */
  greaterThanOrEqual(a, b) {
    return this.compare(a, b) >= 0;
  }

  /**
   * Reverses the current comparison logic.
   * Does not mutate the original function reference.
   */
  reverse() {
    const originalCompare = this.compare;
    this.compare = (a, b) => originalCompare(b, a);
    return this;
  }

  /**
   * Creates a new Comparator instance with the same compare function.
   * @returns {Comparator}
   */
  clone() {
    return new Comparator(this.compare);
  }

  /**
   * Creates a comparator based on a key selector function.
   * Useful for sorting objects by a specific property.
   *
   * @param {Function} keySelector
   * @returns {Comparator}
   */
  static by(keySelector) {
    if (typeof keySelector !== 'function') {
      throw new TypeError('Key selector must be a function');
    }

    return new Comparator((a, b) => {
      const keyA = keySelector(a);
      const keyB = keySelector(b);
      return Comparator.defaultCompareFunction(keyA, keyB);
    });
  }
}
