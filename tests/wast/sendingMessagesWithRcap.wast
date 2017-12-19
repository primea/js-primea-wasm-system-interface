(module
 (type $FUNCSIG$iii (func (param i32 i32) (result i32)))
 (type $FUNCSIG$ii (func (param i32) (result i32)))
 (type $FUNCSIG$vii (func (param i32 i32)))
 (import "env" "createMessage" (func $createMessage (param i32 i32) (result i32)))
 (import "test" "equals" (func $equals (param i32 i32)))
 (import "env" "loadMessageCap" (func $loadMessageCap (param i32 i32) (result i32)))
 (import "env" "mintCap" (func $mintCap (param i32) (result i32)))
 (import "env" "sendMessage" (func $sendMessage (param i32 i32)))
 (import "env" "setResponseCap" (func $setResponseCap (param i32 i32)))
 (table 0 anyfunc)
 (memory $0 1)
 (export "memory" (memory $0))
 (export "onCreation" (func $onCreation))
 (export "onMessage" (func $onMessage))
 (func $onCreation (; 6 ;) (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (set_local $0
   (call $loadMessageCap
    (get_local $0)
    (i32.const 0)
   )
  )
  (set_local $1
   (call $mintCap
    (i32.const 0)
   )
  )
  (call $setResponseCap
   (tee_local $2
    (call $createMessage
     (i32.const 0)
     (i32.const 0)
    )
   )
   (get_local $1)
  )
  (call $sendMessage
   (get_local $0)
   (get_local $2)
  )
 )
 (func $onMessage (; 7 ;) (param $0 i32)
  (call $equals
   (i32.const 1)
   (i32.const 1)
  )
 )
)
