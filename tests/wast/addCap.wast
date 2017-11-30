(module
  (type $FUNCSIG$iii (func (param i32 i32) (result i32)))
  (type $FUNCSIG$i (func (result i32)))
  (type $FUNCSIG$vii (func (param i32 i32)))
  (type $FUNCSIG$ii (func (param i32) (result i32)))
  (import "env" "addCapToMessage" (func $addCapToMessage (param i32 i32)))
  (import "env" "createMessage" (func $createMessage (param i32 i32) (result i32)))
  (import "test" "equals" (func $equals (param i32 i32)))
  (import "env" "messageCapLen" (func $messageCapsLen (param i32) (result i32)))
  (import "env" "mintCap" (func $mintCap (result i32)))
  (table 0 anyfunc)
  (memory $0 1)
  (data (i32.const 16) "\00asm\01\00\00\00\00")
  (export "memory" (memory $0))
  (export "onCreation" (func $onCreation))
  (func $onCreation
    (local $0 i32)
    (local $1 i32)
    (call $addCapToMessage
      (tee_local $0
        (call $createMessage
          (i32.const 16)
          (i32.const 8)
        )
      )
      (tee_local $1
        (call $mintCap)
      )
    )
    (call $equals
      (call $messageCapsLen
        (get_local $0)
      )
      (i32.const 1)
    )
    (call $equals
      (get_local $1)
      (i32.const 2)
    )
  )
)
