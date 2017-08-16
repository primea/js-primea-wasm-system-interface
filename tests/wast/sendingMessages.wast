(module
  (type $FUNCSIG$iii (func (param i32 i32) (result i32)))
  (type $FUNCSIG$viii (func (param i32 i32 i32)))
  (type $FUNCSIG$vii (func (param i32 i32)))
  (import "env" "bindPort" (func $bindPort (param i32 i32 i32)))
  (import "env" "getPort" (func $getPort (param i32 i32) (result i32)))
  (import "env" "loadMessagePort" (func $loadMessagePort (param i32 i32) (result i32)))
  (import "env" "sendMessage" (func $sendMessage (param i32 i32)))
  (table 0 anyfunc)
  (memory $0 1)
  (data (i32.const 16) "test\00")
  (data (i32.const 24) "\10\00\00\00")
  (export "memory" (memory $0))
  (export "onCreation" (func $onCreation))
  (export "onMessage" (func $onMessage))
  (func $onCreation (param $0 i32)
    (set_local $0
      (call $loadMessagePort
        (get_local $0)
        (i32.const 0)
      )
    )
    (call $bindPort
      (i32.load offset=24
        (i32.const 0)
      )
      (i32.const 4)
      (get_local $0)
    )
  )
  (func $onMessage (param $0 i32)
    (call $sendMessage
      (call $getPort
        (i32.load offset=24
          (i32.const 0)
        )
        (i32.const 4)
      )
      (get_local $0)
    )
  )
)
