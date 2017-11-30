(module
  (type $FUNCSIG$i (func (result i32)))
  (type $FUNCSIG$vii (func (param i32 i32)))
  (type $FUNCSIG$ii (func (param i32) (result i32)))
  (type $FUNCSIG$vi (func (param i32)))
  (import "env" "deleteRef" (func $deleteRef (param i32)))
  (import "test" "equals" (func $equals (param i32 i32)))
  (import "env" "isValidRef" (func $isValidRef (param i32) (result i32)))
  (import "env" "mintCap" (func $mintCap (result i32)))
  (table 0 anyfunc)
  (memory $0 1)
  (export "memory" (memory $0))
  (export "onCreation" (func $onCreation))
  (func $onCreation
    (local $0 i32)
    (call $equals
      (tee_local $0
        (call $mintCap)
      )
      (i32.const 1)
    )
    (call $equals
      (call $isValidRef
        (get_local $0)
      )
      (i32.const 1)
    )
    (call $deleteRef
      (get_local $0)
    )
    (call $equals
      (call $isValidRef
        (get_local $0)
      )
      (i32.const 0)
    )
  )
)
