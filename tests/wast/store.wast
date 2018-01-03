(module
 (type $FUNCSIG$vii (func (param i32 i32)))
 (type $FUNCSIG$iii (func (param i32 i32) (result i32)))
 (type $FUNCSIG$ii (func (param i32) (result i32)))
 (type $FUNCSIG$vi (func (param i32)))
 (type $FUNCSIG$viiii (func (param i32 i32 i32 i32)))
 (type $FUNCSIG$viii (func (param i32 i32 i32)))
 (type $FUNCSIG$v (func))
 (import "env" "addCapToMessage" (func $addCapToMessage (param i32 i32)))
 (import "env" "createMessage" (func $createMessage (param i32 i32) (result i32)))
 (import "env" "deleteStore" (func $deleteStore (param i32)))
 (import "test" "equals" (func $equals (param i32 i32)))
 (import "env" "loadMessageData" (func $loadMessageData (param i32 i32 i32 i32)))
 (import "env" "messageCapLen" (func $messageCapLen (param i32) (result i32)))
 (import "env" "messageDataLen" (func $messageDataLen (param i32) (result i32)))
 (import "env" "mintCap" (func $mintCap (param i32) (result i32)))
 (import "env" "openStore" (func $openStore (param i32 i32 i32)))
 (import "env" "updateStore" (func $updateStore (param i32 i32)))
 (table (export "callbacks") 3 3 anyfunc)
 (elem (i32.const 0) $__wasm_nullptr $saveToStore $readFromStore)
 (memory $0 1)
 (data (i32.const 16) "hello world\00")
 (data (i32.const 28) "\10\00\00\00")
 (data (i32.const 32) "test\00")
 (data (i32.const 40) " \00\00\00")
 (export "memory" (memory $0))
 (export "saveToStore" (func $saveToStore))
 (export "readFromStore" (func $readFromStore))
 (export "onCreation" (func $onCreation))
 (export "onMessage" (func $onMessage))
 (func $saveToStore (; 10 ;) (type $FUNCSIG$viii) (param $0 i32) (param $1 i32) (param $2 i32)
  (call $equals
   (get_local $2)
   (i32.const -1)
  )
  (call $addCapToMessage
   (tee_local $2
    (call $createMessage
     (i32.load offset=28
      (i32.const 0)
     )
     (i32.const 11)
    )
   )
   (call $mintCap
    (i32.const 55)
   )
  )
  (call $updateStore
   (get_local $0)
   (get_local $2)
  )
 )
 (func $readFromStore (; 11 ;) (type $FUNCSIG$viii) (param $0 i32) (param $1 i32) (param $2 i32)
  (call $equals
   (get_local $2)
   (i32.const 0)
  )
  (call $equals
   (call $messageCapLen
    (get_local $1)
   )
   (i32.const 1)
  )
  (call $deleteStore
   (get_local $0)
  )
  (call $loadMessageData
   (get_local $1)
   (i32.const 48)
   (i32.const 0)
   (tee_local $0
    (call $messageDataLen
     (get_local $1)
    )
   )
  )
  (block $label$0
   (br_if $label$0
    (i32.lt_s
     (get_local $0)
     (i32.const 1)
    )
   )
   (set_local $1
    (i32.const 0)
   )
   (loop $label$1
    (call $equals
     (i32.load8_s
      (i32.add
       (get_local $1)
       (i32.const 48)
      )
     )
     (i32.load8_s
      (i32.add
       (i32.load offset=28
        (i32.const 0)
       )
       (get_local $1)
      )
     )
    )
    (br_if $label$1
     (i32.ne
      (get_local $0)
      (tee_local $1
       (i32.add
        (get_local $1)
        (i32.const 1)
       )
      )
     )
    )
   )
  )
 )
 (func $onCreation (; 12 ;) (param $0 i32)
  (call $openStore
   (i32.load offset=40
    (i32.const 0)
   )
   (i32.const 4)
   (i32.const 1)
  )
 )
 (func $onMessage (; 13 ;) (param $0 i32)
  (call $openStore
   (i32.load offset=40
    (i32.const 0)
   )
   (i32.const 4)
   (i32.const 2)
  )
 )
 (func $__wasm_nullptr (; 14 ;) (type $FUNCSIG$v)
  (unreachable)
 )
)
