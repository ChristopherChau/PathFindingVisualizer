export class MinHeap{
  constructor(){
    this.heap = [];
  }


  insert(node, distance){
    this.heap.push({node, distance});
    this.bubbleUp(this.heap.length - 1);
  }

  bubbleUp(index){
    while (index > 0){
      const parentIndex = Math.floor((index-1)/2);
      if (this.heap[index].distance < this.heap[parentIndex].distance){
        let temp = this.heap[index];
        this.heap[index] = this.heap[parentIndex];
        this.heap[parentIndex] = temp;
        index = parentIndex;
      }
      else{break;}
    }
  }

  heapify(index){
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let smallest = index;

    if (left < this.size() && this.heap[left].key < this.heap[smallest].key) {
      smallest = left;
    }

    if (right < this.size() && this.heap[right].key < this.heap[smallest].key) {
      smallest = right;
    }

    if (smallest !== index) {
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      this.heapify(smallest);
    }
  }

  extractMin() {
    if (this.isEmpty()) return null;
    if (this.size() === 1) return this.heap.pop();

    let min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapify(0);

    return min;
  }

  isEmpty(){
    return this.heap.length === 0;
  }
  size(){
    return this.heap.length;
  }


}


