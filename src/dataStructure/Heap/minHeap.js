export class MinHeap {
  constructor() {
      this.heap = [];
  }

  // Helper Methods
  getLeftChildIndex(parentIndex) {
      return 2 * parentIndex + 1;
  }
  getRightChildIndex(parentIndex) {
      return 2 * parentIndex + 2;
  }
  getParentIndex(childIndex) {
      return Math.floor((childIndex - 1) / 2);
  }
  hasLeftChild(index) {
      return this.getLeftChildIndex(index) < this.heap.length;
  }
  hasRightChild(index) {
      return this.getRightChildIndex(index) < this.heap.length;
  }
  hasParent(index) {
      return this.getParentIndex(index) >= 0;
  }
  leftChild(index) {
      return this.heap[this.getLeftChildIndex(index)];
  }
  rightChild(index) {
      return this.heap[this.getRightChildIndex(index)];
  }
  parent(index) {
      return this.heap[this.getParentIndex(index)];
  }

  // Functions to create Min Heap
   
  swap(indexOne, indexTwo) {
      const temp = this.heap[indexOne];
      this.heap[indexOne] = this.heap[indexTwo];
      this.heap[indexTwo] = temp;
  }

  peek() {
      if (this.heap.length === 0) {
          return null;
      }
      return this.heap[0];
  }
   
  // Removing an element will remove the
  // top element with highest priority then
  // heapifyDown will be called
  remove() {
      if (this.heap.length === 0) {
          return null;
      }
      const item = this.peek();
      this.heap[0] = this.heap[this.heap.length - 1];
      this.heap.pop();
      this.heapifyDown();
      return item;
  }

  add(item) {
      this.heap.push(item);
      this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (this.hasParent(index) && this.parent(index).distance >= this.heap[index].distance) {
      this.swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
    // console.log(`The peek distance: ${this.peek().distance}`);

  }
  

  heapifyDown() {
      let index = 0;
      while (this.hasLeftChild(index)) {
          let smallerChildIndex = this.getLeftChildIndex(index);
          if (this.hasRightChild(index) && this.rightChild(index).distance < this.leftChild(index).distance) {
              smallerChildIndex = this.getRightChildIndex(index);
          }
          if (this.heap[index].distance < this.heap[smallerChildIndex].distance) {
              break;
          } else {
              this.swap(index, smallerChildIndex);
          }
          index = smallerChildIndex;
      }
      // console.log(`The peek distance: ${this.peek().distance}`);
  }
  size(){
    return this.heap.length;
  }
  

}