(module
  (type $FUNCSIG$ii (func (param i32) (result i32)))
  (type $FUNCSIG$vii (func (param i32 i32)))
  (type $FUNCSIG$iii (func (param i32 i32) (result i32)))
  (import "test" "equals" (func $equals (param i32 i32)))
  (import "env" "loadMessagePort" (func $loadMessagePort (param i32 i32) (result i32)))
  (import "env" "messagePortLen" (func $messagePortLen (param i32) (result i32)))
  (table 0 anyfunc)
  (memory $0 1)
  (data (i32.const 12) "\00\00\00\00")
  (data (i32.const 16) "\00\00\00\00")
  (export "memory" (memory $0))
  (export "onCreation" (func $onCreation))
  (func $onCreation (param $0 i32)
    (call $equals
      (call $messagePortLen
        (get_local $0)
      )
      (i32.const 2)
    )
    (call $equals
      (call $loadMessagePort
        (get_local $0)
        (i32.const 0)
      )
      (i32.const 1)
    )
  )
)
