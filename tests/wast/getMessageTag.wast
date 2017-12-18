(module
 (type $FUNCSIG$ii (func (param i32) (result i32)))
 (type $FUNCSIG$vii (func (param i32 i32)))
 (import "test" "equals" (func $equals (param i32 i32)))
 (import "env" "getMessageTag" (func $getMessageTag (param i32) (result i32)))
 (table 0 anyfunc)
 (memory $0 1)
 (export "memory" (memory $0))
 (export "onMessage" (func $onCreation))
 (func $onCreation (; 2 ;) (param $0 i32)
  (call $equals
   (call $getMessageTag
    (get_local $0)
   )
   (i32.const 2)
  )
 )
)
