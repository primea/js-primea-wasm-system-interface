(module
  (type $FUNCSIG$i (func (result i32)))
  (type $FUNCSIG$vii (func (param i32 i32)))
  (import "test" "equals" (func $equals (param i32 i32)))
  (import "env" "mintCap" (func $mintCap (result i32)))
  (table 0 anyfunc)
  (memory $0 1)
  (export "memory" (memory $0))
  (export "onCreation" (func $onCreation))
  (func $onCreation
    (call $equals
      (call $mintCap)
      (i32.const 1)
    )
  )
)
