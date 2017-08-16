(module
  (type $FUNCSIG$vii (func (param i32 i32)))
  (type $FUNCSIG$ii (func (param i32) (result i32)))
  (type $FUNCSIG$vi (func (param i32)))
  (import "env" "createChannel" (func $createChannel (param i32 i32)))
  (import "env" "deleteRef" (func $deleteRef (param i32)))
  (import "test" "equals" (func $equals (param i32 i32)))
  (import "env" "isValidRef" (func $isValidRef (param i32) (result i32)))
  (table 0 anyfunc)
  (memory $0 1)
  (data (i32.const 12) "\00\00\00\00")
  (data (i32.const 16) "\00\00\00\00")
  (export "memory" (memory $0))
  (export "onCreation" (func $onCreation))
  (func $onCreation
    (call $createChannel
      (i32.const 12)
      (i32.const 16)
    )
    (call $equals
      (i32.load offset=12
        (i32.const 0)
      )
      (i32.const 1)
    )
    (call $equals
      (i32.load offset=16
        (i32.const 0)
      )
      (i32.const 2)
    )
    (call $equals
      (call $isValidRef
        (i32.load offset=12
          (i32.const 0)
        )
      )
      (i32.const 1)
    )
    (call $deleteRef
      (i32.load offset=12
        (i32.const 0)
      )
    )
    (call $equals
      (call $isValidRef
        (i32.load offset=12
          (i32.const 0)
        )
      )
      (i32.const 0)
    )
  )
)
