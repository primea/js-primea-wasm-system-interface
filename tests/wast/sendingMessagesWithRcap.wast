(module
 (type $FUNCSIG$iii (func (param i32 i32) (result i32)))
 (type $FUNCSIG$ii (func (param i32) (result i32)))
 (type $FUNCSIG$iiii (func (param i32 i32 i32) (result i32)))
 (type $FUNCSIG$vii (func (param i32 i32)))
 (import "env" "createMessage" (func $createMessage (param i32 i32 i32) (result i32)))
 (import "test" "equals" (func $equals (param i32 i32)))
 (import "env" "loadMessageCap" (func $loadMessageCap (param i32 i32) (result i32)))
 (import "env" "mintCap" (func $mintCap (param i32) (result i32)))
 (import "env" "sendMessage" (func $sendMessage (param i32 i32)))
 (table 0 anyfunc)
 (memory $0 1)
 (export "memory" (memory $0))
 (export "onCreation" (func $onCreation))
 (export "onMessage" (func $onMessage))
 (func $onCreation (; 5 ;) (param $0 i32)
  (call $sendMessage
   (call $loadMessageCap
    (get_local $0)
    (i32.const 0)
   )
   (call $createMessage
    (i32.const 0)
    (i32.const 0)
    (call $mintCap
     (i32.const 0)
    )
   )
  )
 )
 (func $onMessage (; 6 ;) (param $0 i32)
  (call $equals
   (i32.const 1)
   (i32.const 1)
  )
 )
)
