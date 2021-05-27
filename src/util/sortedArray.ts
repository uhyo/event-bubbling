export class SortedArray<T> {
  #sortKey: (item: T) => number;
  #array: T[];
  #snapshotCache: T[] | undefined;

  constructor(sortKey: (item: T) => number, values: readonly T[]) {
    this.#sortKey = sortKey;
    this.#array = [...values];
    insertionSort(sortKey, this.#array);
  }

  public add(item: T): void {
    this.#snapshotCache = undefined;
    const targetIndex = binarySearch(
      this.#sortKey,
      this.#array,
      this.#sortKey(item)
    );
    this.#array.splice(targetIndex, 0, item);
  }

  public update(index: number, item: T): void {
    // bubble up/down
    const oldItem = this.#array[index];
    if (oldItem === undefined) {
      throw new Error(`update failed: invalid index '${index}`);
    }
    this.#snapshotCache = undefined;

    const newKey = this.#sortKey(item);
    this.#array[index] = item;

    const oldKey = this.#sortKey(oldItem);

    if (oldKey > newKey) {
      // bubble up
      while (index > 0) {
        if (this.#sortKey(this.#array[index - 1]) > newKey) {
          [this.#array[index - 1], this.#array[index]] = [
            this.#array[index],
            this.#array[index - 1],
          ];
          index--;
        } else {
          break;
        }
      }
    } else if (oldKey < newKey) {
      // bubble down
      while (index < this.#array.length - 1) {
        if (this.#sortKey(this.#array[index + 1]) < newKey) {
          [this.#array[index + 1], this.#array[index]] = [
            this.#array[index],
            this.#array[index + 1],
          ];
          index++;
        } else {
          break;
        }
      }
    }
  }

  public remove(index: number): void {
    this.#snapshotCache = undefined;
    this.#array.splice(index, 1);
  }

  public snapshot(): T[] {
    return (this.#snapshotCache ||= [...this.#array]);
  }

  public at(index: number): T {
    const item = this.#array[index];
    if (item === undefined) {
      throw new Error(`No item at index '${index}'`);
    }
    return item;
  }

  // array functions
  public forEach(callback: (item: T, index: number) => void): void {
    this.#array.forEach(callback);
  }
  public map<U>(mapper: (item: T, index: number) => U): U[] {
    return this.#array.map(mapper);
  }

  public [Symbol.iterator](): IterableIterator<T> {
    return this.#array[Symbol.iterator]();
  }

  public get length(): number {
    return this.#array.length;
  }
}

/**
 * Binary search.
 * @returns index in [0, arr.length]
 */
function binarySearch<T>(
  sortKey: (item: T) => number,
  arr: readonly T[],
  target: number
): number {
  let start = 0;
  let end = arr.length;
  while (start < end) {
    const middle = Math.floor((end + start) / 2);
    const k = sortKey(arr[middle]);
    if (target < k) {
      end = middle;
    } else {
      start = middle + 1;
    }
  }
  return start;
}

function insertionSort<T>(sortKey: (item: T) => number, arr: T[]): T[] {
  const length = arr.length;
  for (let i = 1; i < length; i++) {
    const current = arr[i];
    const currentKey = sortKey(current);
    if (sortKey(arr[i - 1]) > currentKey) {
      let j = i;
      for (; j >= 1; j--) {
        if (sortKey(arr[j - 1]) > currentKey) {
          arr[j] = arr[j - 1];
        } else {
          break;
        }
      }
      arr[j] = current;
    }
  }
  return arr;
}
