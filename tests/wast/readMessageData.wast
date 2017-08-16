(module
  (type $FUNCSIG$iii (func (param i32 i32) (result i32)))
  (type $FUNCSIG$viii (func (param i32 i32 i32)))
  (type $FUNCSIG$ii (func (param i32) (result i32)))
  (type $FUNCSIG$viiii (func (param i32 i32 i32 i32)))
  (type $FUNCSIG$vii (func (param i32 i32)))
  (import "env" "bindPort" (func $bindPort (param i32 i32 i32)))
  (import "test" "equals" (func $equals (param i32 i32)))
  (import "env" "getMessageDataLen" (func $getMessageDataLen (param i32) (result i32)))
  (import "env" "loadMessageData" (func $loadMessageData (param i32 i32 i32 i32)))
  (import "env" "loadMessagePort" (func $loadMessagePort (param i32 i32) (result i32)))
  (table 0 anyfunc)
  (memory $0 1)
  (data (i32.const 12) "\00\00\00\00")
  (data (i32.const 16) "\00\00\00\00")
  (data (i32.const 32) "test\00")
  (data (i32.const 40) " \00\00\00")
  (data (i32.const 44) "\00\00\00\00")
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
      (i32.load offset=40
        (i32.const 0)
      )
      (i32.const 4)
      (get_local $0)
    )
  )
  (func $onMessage (param $0 i32)
    (local $1 i32)
    (set_local $1
      (call $getMessageDataLen
        (get_local $0)
      )
    )
    (call $loadMessageData
      (get_local $0)
      (i32.const 0)
      (i32.load offset=44
        (i32.const 0)
      )
      (get_local $1)
    )
    (i32.store offset=44
      (i32.const 0)
      (i32.add
        (tee_local $0
          (i32.load offset=44
            (i32.const 0)
          )
        )
        (i32.const 1)
      )
    )
    (call $equals
      (i32.load8_s
        (get_local $0)
      )
      (i32.const 1)
    )
    (i32.store offset=44
      (i32.const 0)
      (i32.add
        (tee_local $0
          (i32.load offset=44
            (i32.const 0)
          )
        )
        (i32.const 1)
      )
    )
    (call $equals
      (i32.load8_s
        (get_local $0)
      )
      (i32.const 2)
    )
    (i32.store offset=44
      (i32.const 0)
      (i32.add
        (tee_local $0
          (i32.load offset=44
            (i32.const 0)
          )
        )
        (i32.const 1)
      )
    )
    (call $equals
      (i32.load8_s
        (get_local $0)
      )
      (i32.const 3)
    )
    (i32.store offset=44
      (i32.const 0)
      (i32.add
        (tee_local $0
          (i32.load offset=44
            (i32.const 0)
          )
        )
        (i32.const 1)
      )
    )
    (call $equals
      (i32.load8_s
        (get_local $0)
      )
      (i32.const 4)
    )
    (i32.store offset=44
      (i32.const 0)
      (i32.add
        (tee_local $0
          (i32.load offset=44
            (i32.const 0)
          )
        )
        (i32.const 1)
      )
    )
    (call $equals
      (i32.load8_s
        (get_local $0)
      )
      (i32.const 5)
    )
  )
)
