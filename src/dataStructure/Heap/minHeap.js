export class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }

    const root = this.heap[0];
    const lastNode = this.heap.pop();

    if (!this.isEmpty()) {
      this.heap[0] = lastNode;
      this.heapifyDown();
    }

    return root;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  heapifyUp() {
    let currentIndex = this.heap.length - 1;

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);

      if (this.heap[parentIndex].distance > this.heap[currentIndex].distance) {
        this.swap(parentIndex, currentIndex);
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  heapifyDown() {
    let currentIndex = 0;
    const length = this.heap.length;

    while (true) {
      const leftChildIndex = 2 * currentIndex + 1;
      const rightChildIndex = 2 * currentIndex + 2;
      let smallestChildIndex = currentIndex;

      if (
        leftChildIndex < length &&
        this.heap[leftChildIndex].distance <
          this.heap[smallestChildIndex].distance
      ) {
        smallestChildIndex = leftChildIndex;
      }

      if (
        rightChildIndex < length &&
        this.heap[rightChildIndex].distance <
          this.heap[smallestChildIndex].distance
      ) {
        smallestChildIndex = rightChildIndex;
      }

      if (currentIndex !== smallestChildIndex) {
        this.swap(currentIndex, smallestChildIndex);
        currentIndex = smallestChildIndex;
      } else {
        break;
      }
    }
  }

  swap(index1, index2) {
    const temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  }

  size() {
    return this.heap.length;
  }
}
