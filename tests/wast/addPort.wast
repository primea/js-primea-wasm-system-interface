(module
  (type $FUNCSIG$iii (func (param i32 i32) (result i32)))
  (type $FUNCSIG$vii (func (param i32 i32)))
  (type $FUNCSIG$ii (func (param i32) (result i32)))
  (import "env" "addPortToMessage" (func $addPortToMessage (param i32 i32)))
  (import "env" "createChannel" (func $createChannel (param i32 i32)))
  (import "env" "createMessage" (func $createMessage (param i32 i32) (result i32)))
  (import "test" "equals" (func $equals (param i32 i32)))
  (import "env" "messagePortLen" (func $messagePortLen (param i32) (result i32)))
  (table 0 anyfunc)
  (memory $0 1)
  (data (i32.const 12) "\00\00\00\00")
  (data (i32.const 16) "\00\00\00\00")
  (data (i32.const 32) "\00asm\01\00\00\00\00")
  (export "memory" (memory $0))
  (export "onCreation" (func $onCreation))
  (func $onCreation
    (local $0 i32)
    (set_local $0
      (call $createMessage
        (i32.const 32)
        (i32.const 8)
      )
    )
    (call $createChannel
      (i32.const 12)
      (i32.const 16)
    )
    (call $addPortToMessage
      (get_local $0)
      (i32.load offset=12
        (i32.const 0)
      )
    )
    (call $equals
      (call $messagePortLen
        (get_local $0)
      )
      (i32.const 1)
    )
    (call $equals
      (i32.load offset=16
        (i32.const 0)
      )
      (i32.const 3)
    )
  )
)
