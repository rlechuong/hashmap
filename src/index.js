import "./styles.css";

class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = new Array(capacity).fill(null).map(() => []);
    this.size = 0;
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
    this.size++;

    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }
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

    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i][0] === key) {
        this.buckets[index].splice(i, 1);
        this.size--;
        return true;
      }
    }

    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  keys() {
    const keysArray = [];

    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        keysArray.push(entry[0]);
      }
    }

    return keysArray;
  }

  values() {
    const valuesArray = [];

    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        valuesArray.push(entry[1]);
      }
    }

    return valuesArray;
  }

  entries() {
    const entriesArray = [];

    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        entriesArray.push([entry[0], entry[1]]);
      }
    }

    return entriesArray;
  }

  resize() {
    const oldEntries = this.entries();
    this.capacity = this.capacity * 2;
    const newBuckets = new Array(this.capacity).fill(null).map(() => []);
    this.buckets = newBuckets;
    this.size = 0;

    for (const entry of oldEntries) {
      this.set(entry[0], entry[1]);
    }
  }
}

class HashSet {
  constructor() {
    this.map = new HashMap();
  }

  add(key) {
    this.map.set(key, true);
  }

  has(key) {
    return this.map.has(key);
  }

  remove(key) {
    return this.map.remove(key);
  }

  size() {
    return this.map.length();
  }

  clear() {
    this.map.clear();
  }

  keys() {
    return this.map.keys();
  }
}

const test = new HashMap(0.75);

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.length());

console.log(test);

test.set("apple", "green");
test.set("grape", "green");
test.set("ice cream", "chocolate");

console.log(test.length());

test.set("moon", "silver");

console.log(test.length());

console.log(test);