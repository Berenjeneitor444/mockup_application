export abstract class Utils {
  public static groupBy = function (xs: any[], key: string) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  /**
   * Sorts an array of objects by a nested string field.
   *
   * @param array - The array of objects to be sorted.
   * @param field - A function that takes an object and returns the nested string field by which to sort.
   * @returns The sorted array.
   *
   * @example
   * const myArray = [
   *   { id: 1, details: { name: 'John', age: 30 } },
   *   { id: 2, details: { name: 'Alice', age: 25 } },
   *   { id: 3, details: { name: 'Bob', age: 35 } },
   * ];
   *
   * const sortedArray = sortByNestedStringField(myArray, item => item.details.name);
   * console.log(sortedArray);
   * // Output: [
   * //   { id: 2, details: { name: 'Alice', age: 25 } },
   * //   { id: 3, details: { name: 'Bob', age: 35 } },
   * //   { id: 1, details: { name: 'John', age: 30 } }
   * // ]
   */
  public static sortByNestedKey<T>(
    array: T[],
    field: (item: T) => string
  ): T[] {
    return array.sort((a, b) => {
      const fieldA = field(a).toLowerCase();
      const fieldB = field(b).toLowerCase();

      if (fieldA < fieldB) {
        return -1;
      }
      if (fieldA > fieldB) {
        return 1;
      }
      return 0;
    });
  }
  public static datesAreOnSameDay(first: Date, second: Date) {
    if (!first || !second) {
      return false;
    }
    return (
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate()
    );
  }
}
