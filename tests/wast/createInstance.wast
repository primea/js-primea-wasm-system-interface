(module
 (type $FUNCSIG$ii (func (param i32) (result i32)))
 (type $FUNCSIG$iiii (func (param i32 i32 i32) (result i32)))
 (type $FUNCSIG$vii (func (param i32 i32)))
 (import "env" "createActor" (func $createActor (param i32) (result i32)))
 (import "env" "createMessage" (func $createMessage (param i32 i32 i32) (result i32)))
 (import "test" "equals" (func $equals (param i32 i32)))
 (import "env" "getMessageTag" (func $getMessageTag (param i32) (result i32)))
 (import "env" "mintCap" (func $mintCap (param i32) (result i32)))
 (table 0 anyfunc)
 (memory $0 1)
 (data (i32.const 16) "\00asm\01\00\00\00\01\t\02`\02\7f\7f\00`\00\00\02\0f\01\04test\06equals\00\00\03\02\01\01\04\04\01p\00\00\05\03\01\00\01\07\17\02\06memory\02\00\nonCreation\00\01\n\n\01\08\00A\01A\01\10\00\0b\00\00")
 (data (i32.const 108) "\10\00\00\00")
 (export "memory" (memory $0))
 (export "onCreation" (func $onCreation))
 (export "onMessage" (func $onMessage))
 (func $onCreation (; 5 ;)
  (local $0 i32)
  (set_local $0
   (call $mintCap
    (i32.const 66)
   )
  )
  (drop
   (call $createActor
    (call $createMessage
     (i32.load offset=108
      (i32.const 0)
     )
     (i32.const 88)
     (get_local $0)
    )
   )
  )
 )
 (func $onMessage (; 6 ;) (param $0 i32)
  (call $equals
   (call $getMessageTag
    (get_local $0)
   )
   (i32.const 66)
  )
 )
)
