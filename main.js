export class HashMap {
  constructor(initialCapacity = 50, loadFactor = 0.7) {
    this.capacity = initialCapacity;
    this.loadFactor = loadFactor;
    this.size = 0;
    this.bucket = new Array(this.capacity);
  }


  hash(key) {
    let stringToNum = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      stringToNum = stringToNum * primeNumber + key.charCodeAt(i);
    }
    return stringToNum % this.capacity;
  }

  set(key, value) {
    const index = this.hash(key);
    const existing = this.bucket[index];

    if (existing && existing.key === key) {
      existing.value = value;
    } else {
      this.bucket[index] = { key, value };
      this.size++;

      if (this.size / this.capacity > this.loadFactor) {
        this.resize();
      }
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.bucket[index];

    if (bucket && bucket.key === key) {
      return bucket.value;
    }

    return null;
  }

  resize() {
    const newCapacity = this.capacity * 2;
    const newBucket = new Array(newCapacity);

    for (let i = 0; i < this.capacity; i++) {
      if (this.bucket[i]) {
        const index = this.hash(this.bucket[i].key) % newCapacity;
        newBucket[index] = this.bucket[i];
      }
    }

    this.capacity = newCapacity;
    this.bucket = newBucket;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.bucket[index];

    if (bucket && bucket.key === key) {
      return true;
    } else return false;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.bucket[index];

    if (bucket && bucket.key === key) {
      this.bucket = null;
      this.size--;
      return true;
    } else return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.bucket = new Array(this.capacity);
    this.length = 0;
  }

  keys() {
    const keysArr = [];

    for (let i = 0; i < this.bucket.length; i++) {
      const bucketPair = this.bucket[i];

      if (bucketPair && bucketPair.key !== undefined) {
        keysArr.push(bucketPair.key);
      }
    }
    return keysArr;
  }

  values() {
    const valuesArr = [];

    for (let i = 0; i < this.bucket.length; i++) {
      const bucketPair = this.bucket[i];

      if (bucketPair && bucketPair.value !== undefined) {
        valuesArr.push(bucketPair.value);
      }
    }
    return valuesArr;
  }

  entries() {
    const entriesArr = [];

    for (let i = 0; i < this.bucket.length; i++) {
      const bucketItem = this.bucket[i];
      if (bucketItem && bucketItem.key !== undefined) {
        entriesArr.push([bucketItem.key, bucketItem.value]);
      }
    }

    return entriesArr;
  }
}
