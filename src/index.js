import "./styles.css";

class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = new Array(capacity).fill(null).map(() => []);
    this.entries = 0;
  }

  _checkBounds(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  // Handles collisions by pushing new [key, value] into bucket
  set(key, value) {
    const index = this.hash(key);
    this._checkBounds(index);

    for (const entry of this.buckets[index]) {
      if (entry[0] === key) {
        entry[1] = value;
        return;
      }
    }

    this.buckets[index].push([key, value]);
    this.entries++;
  }

  get(key) {
    const index = this.hash(key);
    this._checkBounds(index);

    for (const entry of this.buckets[index]) {
      if (entry[0] === key) {
        return entry[1];
      }
    }

    return null;
  }

  has(key) {
    const index = this.hash(key);
    this._checkBounds(index);

    for (const entry of this.buckets[index]) {
      if (entry[0] === key) {
        return true;
      }
    }

    return false;
  }

  remove(key) {
    const index = this.hash(key);
    this._checkBounds(index);

    for (const entry of this.buckets[index]) {
      if (entry[0] === key) {
        let indexToRemove = this.buckets[index].indexOf(entry);
        this.buckets[index].splice(indexToRemove, 1);
        this.entries--;
        return true;
      }
    }

    return false;
  }
}
