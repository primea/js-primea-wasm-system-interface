# Webassembly System Interface

The system interface defines which imports are avaible to webassembly programs
running inside Primea.

We define the following types:
- `i32`: same as `i32` in WebAssembly
- `i32ptr`: same as `i32` in WebAssembly, but treated as a pointer to a WebAssembly memory offset
- `i32ref`: same as `i32` in WebAssembly, but treated as a referance to a Primea object

### createMessage
Messages can contain data which is read from memory starting at the `offset`
and going for `len` bytes.

**Parameters**

* `offset`  **i32ptr** - a pointer to the location in memory to start reading from
* `len` **i32** - the number of bytes to read starting from `offset`

**Returns**

* **i32ref** the refence to a the message 

### mintCap
Mints a new capability to message the minter
**Returns**

* **i32ref** the refence to a the capability 

### storeCap
Store a capability persistently at a given index 

**Parameters**

* `index`  **i32** - an index to store the capability at
* `capRef` **i32ref** - the referance to the capability being stored

### loadCap
Loads a capability from persistant storage at a given index 

**Parameters**

* `index`  **i32**

**Returns**

* **i32ref** - the referance to the capability being loaded

### deleteCap
Deletes a capability from persistant storage at a given index 

**Parameters**

* `index`  **i32**

**Returns**

* **i32ref** - the referance to the capability being loaded

### messageDataLen
Gets the number of bytes contain in the message's data payload

**Parameters**
* `message` **i32ref** - the referance to the message

**Returns**
* **i32**

### loadMessageData
Loads the message's data into memory

**Parameters**
* `message` **i32ref** - the referance to the message
* `writeOffset` **i32ptr**
* `readOffset` **i32ptr**
* `len` **i32**

### addCapToMessage
Add a capability referance to a message

**Parameters**
* `message` **i32ref** - the referance to the message
* `port` **i32ref** - the referance to the capability


### messageCapLen
get the number of caps contained in the message

**Parameters**
* `message` **i32ref** - the referance to the message

**Returns**
* **i32**

### loadMessageCap
loads a capabilities referance from the message

**Parameters**
* `message` **i32ref** - the referance to the message
* `index` **i32** which capability to in the message to load

**Returns**
* **i32**

### sendMessage
sends a message

**Parameters**
* `message` **i32ref** - the referance to the message
* `cap` **i32ref** - the referance to the capability to send the message

### isValidRef
test if a given i32 is a valid referance or not

**Parameters**
* `message` **i32ref**

**Returns**
* **i32**

### deleteRef
deletes a referance

**Parameters**
* `message` **i32ref**
