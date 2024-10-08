const hashMap = function()  {

  let hashmap = new Array(16)

  let capacity = hashmap.length
  let loadFactor = 0.75
  let amountOfEntries = 0

  function hash(key) {
   
    let hashCode = 0;
       
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 16
    }
    return hashCode;
  }

  function set(key, value) {

    let hashKey = hash(key)
    let newNode = node(key, value)
   
    if (hashmap[hashKey] == undefined) {    
      // if index in unused we'll transform the undefined value into linked list header
      hashmap[hashKey] = newNode
      amountOfEntries += 1
    }
 
    else {
      let addedOrOverwrote = traverseCompare(hashmap[hashKey], newNode)
      /* if traverseCompare returns true, it means that the created node is
         a new one, false means that existing node is overwritten */      
      if (addedOrOverwrote) amountOfEntries += 1
    }
   
    /* lastly check the current load of our hashmap and double the size if needs be */
    if (amountOfEntries > (capacity * loadFactor)) doubleArraySize(hashmap)
   
  }

  function get(key) {

  }

  function has(key) {

  }

  function remove(key) {

  }

  function length() {
    return amountOfEntries
  }

  function clear() {
    hashmap = new Array(16)
  }

  function keys() {
    
    let keysArr = []
    
    function recurseBucket(node) {
      keysArr.push(node.nodeKey)
      if (node.nextNode == null) {
        return 
      } else {
        return recurseBucket(node.nextNode)
      }
    }
    
    for (let entry of hashmap) {
      if (entry !== undefined) {
        if (entry.nextNode == null) keysArr.push(entry.nodeKey)
        else recurseBucket(entry)
      }
    }
    
    return keysArr
  }
 
  function values() {
    let valuesArr = []
    
    function recurseBucket(node) {
      valuesArr.push(node.nodeValue)
      if (node.nextNode == null) {
        return 
      } else {
        return recurseBucket(node.nextNode)
      }
    }
    
    for (let entry of hashmap) {
      if (entry !== undefined) {
        if (entry.nextNode == null) valuesArr.push(entry.nodeValue)
        else recurseBucket(entry)
      }
    }
    
    return valuesArr
  }

  function entries() {
    let entriesArr = []
    
    function recurseBucket(node) {
      entriesArr.push([node.nodeKey, node.nodeValue])
      if (node.nextNode == null) {
        return 
      } else {
        return recurseBucket(node.nextNode)
      }
    }
    
    for (let entry of hashmap) {
      if (entry !== undefined) {
        if (entry.nextNode == null) entriesArr.push([entry.nodeKey, entry.nodeValue])
        else recurseBucket(entry)
      }
    }
    
    return entriesArr
  }

  return {hash, set, get, has, remove, length, clear, keys, values, entries}
}

const node = function(key, val) {
  let nodeKey = key
  let nodeValue = val
  let nextNode = null;

  return {nodeKey, nodeValue, nextNode}
}

const traverseCompare = function(obj, newNode) {
 
  while (obj.nextNode !== null) {
    if (obj.nodeKey == newNode.nodeKey) {
      obj.nodeValue = newNode.nodeValue
      return false
     
    } else obj = obj.nextNode
  }

 
  /* reached the end of linked list, so we'll still check if the last node's
  key is the the same as our newNodes' key. If it is, overwrite value */
  if (obj.nodeKey == newNode.nodeKey) {
    obj.nodeValue = newNode.nodeValue
    return false
   
  } else {
    obj.nextNode = newNode
    return true
  }
}

const doubleArraySize = function(hashmap) {
  const reHashMap = new Array(hashmap.length*2)
  for (let entry of hashmap) {
    if (typeof entry == 'string') {
      let entry = hash(entry)
    }
  }
}

/*if (index < 0 || index >= buckets.length) {
  throw new Error("Trying to access index out of bound");
}*/

const test = new hashMap()
test.set('elppa', 'red')
test.set('apple', 'red')
test.set('apple', 'yellow')
test.set('leapp', 'red')
console.log(test.keys())
console.log(test.values())
console.log(test.entries())

/* test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('moon', 'silver') */