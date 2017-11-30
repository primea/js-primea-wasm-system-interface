(module
  (type $FUNCSIG$iii (func (param i32 i32) (result i32)))
  (type $FUNCSIG$vii (func (param i32 i32)))
  (import "env" "deleteCap" (func $deleteCap (param i32 i32) (result i32)))
  (import "env" "loadMessageCap" (func $loadMessageCap (param i32 i32) (result i32)))
  (import "env" "storeCap" (func $storeCap (param i32 i32)))
  (table 0 anyfunc)
  (memory $0 1)
  (export "memory" (memory $0))
  (export "onCreation" (func $onCreation))
  (export "onMessage" (func $onMessage))
  (func $onCreation (param $0 i32)
    (call $storeCap
      (i32.const 0)
      (call $loadMessageCap
        (get_local $0)
        (i32.const 0)
      )
    )
  )
  (func $onMessage (param $0 i32)
    (drop
      (call $deleteCap
        (i32.const 0)
        (i32.const 4)
      )
    )
  )
)
