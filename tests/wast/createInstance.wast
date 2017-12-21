(module
 (type $FUNCSIG$iii (func (param i32 i32) (result i32)))
 (type $FUNCSIG$ii (func (param i32) (result i32)))
 (type $FUNCSIG$vii (func (param i32 i32)))
 (type $FUNCSIG$vi (func (param i32)))
 (import "env" "addCapToMessage" (func $addCapToMessage (param i32 i32)))
 (import "env" "createActor" (func $createActor (param i32)))
 (import "env" "createMessage" (func $createMessage (param i32 i32) (result i32)))
 (import "test" "equals" (func $equals (param i32 i32)))
 (import "env" "getMessageTag" (func $getMessageTag (param i32) (result i32)))
 (import "env" "mintCap" (func $mintCap (param i32) (result i32)))
 (table 0 anyfunc)
 (memory $0 1)
 (data (i32.const 16) "\00asm\01\00\00\00\01\10\03`\02\7f\7f\01\7f`\02\7f\7f\00`\01\7f\00\02<\03\03env\0dcreateMessage\00\00\03env\0eloadMessageCap\00\00\03env\0bsendMessage\00\01\03\02\01\02\04\04\01p\00\00\05\03\01\00\01\07\17\02\06memory\02\00\nonCreation\00\03\n\18\01\16\01\01\7fA\00A\00\10\00!\01 \00A\00\10\01 \01\10\02\0b")
 (export "memory" (memory $0))
 (export "onCreation" (func $onCreation))
 (export "onMessage" (func $onMessage))
 (func $onCreation (; 6 ;)
  (local $0 i32)
  (call $addCapToMessage
   (tee_local $0
    (call $createMessage
     (i32.const 16)
     (i32.const 154)
    )
   )
   (call $mintCap
    (i32.const 66)
   )
  )
  (call $createActor
   (get_local $0)
  )
 )
 (func $onMessage (; 7 ;) (param $0 i32)
  (call $equals
   (call $getMessageTag
    (get_local $0)
   )
   (i32.const 66)
  )
 )
)
