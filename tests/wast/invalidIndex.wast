(module
 (type $FUNCSIG$iii (func (param i32 i32) (result i32)))
 (import "env" "loadMessageCap" (func $loadMessageCap (param i32 i32) (result i32)))
 (table 0 anyfunc)
 (memory $0 1)
 (export "memory" (memory $0))
 (export "onCreation" (func $onCreation))
 (func $onCreation (; 1 ;) (param $0 i32)
  (drop
   (call $loadMessageCap
    (get_local $0)
    (i32.const 0)
   )
  )
 )
)
