### createMessage
Messages can contain data which is read from memory starting at the `offset`
and going for `len` bytes.

**Parameters**

* `offset`  **i32ptr** - a pointer to the location in memory to start reading from
* `len` **i32** - the number of bytes to read starting from `offset`

**Returns**

* **i32ref** the refence to a the message 

### createChannel
Creates a channel and writes to port referances to memory. Each port referance
is an `i32`

**Parameters**

* `locA` **i32ptr**
* `locB` **i32ptr** 

### bindPort
Assigns a byte array to a port and starts to listen for incoming messages on it.
The byte array is used a name to retrieve the port in the future.

**Parameters**

* `offset`  **i32ptr** - a pointer to the location in memory to start reading from
* `len` **i32** - the number of bytes to read starting from `offset`
* `portRef` **i32ref** - the referance to the port being bounded

### unbindPort
Stops listening to a port and returns a referance to the port

**Parameters**

* `offset`  **i32ptr** - a pointer to the location in memory to start reading from
* `len` **i32** - the number of bytes to read starting from `offset`

**Returns**

* **i32ref** - the referance to the port being unbounded

### getPort
Given the port's name this returns a refernce to the port. 

**Parameters**

* `offset`  **i32ptr** - a pointer to the location in memory to start reading from
* `len` **i32** - the number of bytes to read starting from `offset`

**Returns**

* **i32ref** - the referance to the port being unbounded

### getMessageDataLen
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

### addPortToMessage
Add a port ref to a message

**Parameters**
* `message` **i32ref** - the referance to the message
* `port` **i32ref** - the referance to the port


### getMessagePortLen
get the number of ports contained in the message

**Parameters**
* `message` **i32ref** - the referance to the message

**Returns**
* **i32**

### loadMessagePortRef(index: i32) -> i32
loads a port ref from the message

**Parameters**
* `message` **i32ref** - the referance to the message
* `index` **i32**

**Returns**
* **i32**

### sendMessage
sends a message on a given port

**Parameters**
* `message` **i32ref** - the referance to the message
* `port` **i32ref** - the referance to the port

### isvalidRef
test is an i32 is a valid ref or not

**Parameters**
* `message` **i32ref**

**Returns**
* **i32**

### deleteRef
deletes port or message refs 

**Parameters**
* `message` **i32ref**
