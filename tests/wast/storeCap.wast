(module
  (type $FUNCSIG$vii (func (param i32 i32)))
  (import "env" "storeMessage" (func $storeMessage (param i32 i32)))
  (table 0 anyfunc)
  (memory $0 1)
  (export "memory" (memory $0))
  (export "onCreation" (func $onCreation))
  (func $onCreation (param $0 i32)
    (call $storeMessage
      (i32.const 1)
      (get_local $0)
    )
  )
)
