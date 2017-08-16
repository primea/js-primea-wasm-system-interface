(module
  (type $FUNCSIG$iii (func (param i32 i32) (result i32)))
  (type $FUNCSIG$vii (func (param i32 i32)))
  (import "env" "createInstance" (func $createInstance (param i32 i32)))
  (import "env" "createMessage" (func $createMessage (param i32 i32) (result i32)))
  (table 0 anyfunc)
  (memory $0 1)
  (data (i32.const 16) "\00asm\01\00\00\00\01\t\02`\02\7f\7f\00`\00\00\02\0f\01\04test\06equals\00\00\03\02\01\01\04\04\01p\00\00\05\03\01\00\01\07\17\02\06memory\02\00\nonCreation\00\01\n\n\01\08\00A\01A\01\10\00\0b\00\00")
  (data (i32.const 108) "\10\00\00\00")
  (export "memory" (memory $0))
  (export "onCreation" (func $onCreation))
  (func $onCreation
    (call $createInstance
      (i32.const 1)
      (call $createMessage
        (i32.load offset=108
          (i32.const 0)
        )
        (i32.const 88)
      )
    )
  )
)
