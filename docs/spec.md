# Webassembly System Interface

The system interface defines which imports are avaible to Webassembly programs running inside Primea.

We define the following types:
- `i32`: same as `i32` in WebAssembly
- `i32ptr`: same as `i32` in WebAssembly, but treated as a pointer to a WebAssembly memory offset
- `i32ref`: same as `i32` in WebAssembly, but treated as a reference to a Primea object


## Storage
### storeMessage
Store a message along with it's data and associated capablilities persistently at a given index 

**Parameters**

* `index`  **i32** - an index to store the capability at
* `msgRef` **i32ref** - the reference to the message being stored

### loadMessage
Loads a message along with it's data and associated capablilities from persistant storage at a given index 

**Parameters**

* `index`  **i32**
* `callback` **i32ptr**  - the callback function which is given an `i32ref` of a message containing the loaded data

**Returns**

* **i32ref** - the reference to the capability being loaded

### deleteMessage
Deletes a message from persistant storage at a given index 

**Parameters**

* `index`  **i32**

## Messages
### createMessage
Messages can contain data which is read from memory starting at the `offset`
and going for `len` bytes.

**Parameters**

* `offset`  **i32ptr** - a pointer to the location in memory to start reading from
* `len` **i32** - the number of bytes to read starting from `offset`
* `responseCap` **i32ref** - A capability that is send to send a response. If no response is desired then a negitive integer can be used instead of a referance.

**Returns**

* **i32ref** the refence to a the message 

### loadMessageData
Loads the message's data into memory

**Parameters**
* `message` **i32ref** - the reference to the message
* `writeOffset` **i32ptr**
* `readOffset` **i32ptr**
* `len` **i32**

### addCapToMessage
Add a capability reference to a message

**Parameters**
* `message` **i32ref** - the reference to the message
* `port` **i32ref** - the reference to the capability


### messageCapLen
get the number of caps contained in the message

**Parameters**
* `message` **i32ref** - the reference to the message

**Returns**
* **i32**

### loadMessageCap
loads a capabilities reference from the message

**Parameters**
* `message` **i32ref** - the reference to the message
* `index` **i32** which capability to in the message to load

**Returns**
* **i32**

### sendMessage
sends a message

**Parameters**

* `cap` **i32ref** - the reference to the capability to send the message
* `message` **i32ref** - the reference to the message
* `ticks` **i32** - the number of ticks to allocate to this message

### messageDataLen
Gets the number of bytes contain in the message's data payload

**Parameters**
* `message` **i32ref** - the reference to the message

**Returns**
* **i32**

### getMessageTag
Gets the tag of the capabilbilty that was used to send the message

**Parameters**
* `message` **i32ref** - The reference to the message

**Returns**
* **i32**

### getNextMessage
Gets the next message from the inbox, if any, while maintaing the current state of the VM.

**Parameters**
* `timeout` **i32** - The amount of ticks to wait before timeing out. 
* `timeout_callback` **i32ptr**  - the callback function which is called if `getNextMessage` timeseout

### respond
Sends a response to the current message using its response capability.

**Parameters**
* `message` **i32Ref** - The message to send in response.

### createActor
Creates a new actor given a message. A message's data field must contain the wasm binary of the new actor.

**Parameters**
* `message` **i32Ref** - The message to send in response.

## references
### mintCap
Mints a new capability to message the minter
**Returns**

* **i32ref** the refence to a the capability 

### isValidRef
test if a given i32 is a valid reference or not

**Parameters**
* `message` **i32ref**

**Returns**
* **i32**

### deleteRef
deletes a reference

**Parameters**
* `message` **i32ref**
