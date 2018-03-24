define(function() {
  function ListNode(val) {
    this.val = val;
    this.next = null;
  }
  
  function arrayToLinkedList(arr) {
    if (arr.length > 0) {
      return arr.slice(1)
        .reduce((acc, cur) => acc.next = new ListNode(cur), new ListNode(arr[0]));
    }
    return null;
  }

  Object.assign(window, { arrayToLinkedList });
})
