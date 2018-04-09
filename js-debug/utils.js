define(function() {
  function ListNode(val) {
    this.val = val;
    this.next = null;
  }
  
  function arrayToLinkedList(arr) {
    if (arr.length > 0) {
      const head = new ListNode();
      let iter = head;
      arr.forEach(function(v) {
        iter = iter.next = new ListNode(v);
      })
      return head.next;
    }
    return null;
  }

  Object.assign(window, { arrayToLinkedList });
})
