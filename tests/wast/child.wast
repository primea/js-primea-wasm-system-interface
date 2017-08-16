(module
  (type $FUNCSIG$vii (func (param i32 i32)))
  (import "test" "equals" (func $equals (param i32 i32)))
  (table 0 anyfunc)
  (memory $0 1)
  (export "memory" (memory $0))
  (export "onCreation" (func $onCreation))
  (func $onCreation
    (call $equals
      (i32.const 1)
      (i32.const 1)
    )
  )
)
