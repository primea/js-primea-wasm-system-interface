(module
  (type $FUNCSIG$iii (func (param i32 i32) (result i32)))
  (type $FUNCSIG$vii (func (param i32 i32)))
  (import "env" "loadMessageCap" (func $loadMessageCap (param i32 i32) (result i32)))
  (import "env" "sendMessage" (func $sendMessage (param i32 i32)))
  (table 0 anyfunc)
  (memory $0 1)
  (export "memory" (memory $0))
  (export "onCreation" (func $onCreation))
  (func $onCreation (param $0 i32)
    (call $sendMessage
      (call $loadMessageCap
        (get_local $0)
        (i32.const 0)
      )
      (get_local $0)
    )
  )
)
