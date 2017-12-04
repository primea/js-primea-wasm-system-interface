(module
  (type $FUNCSIG$ii (func (param i32) (result i32)))
  (type $FUNCSIG$viiii (func (param i32 i32 i32 i32)))
  (type $FUNCSIG$vii (func (param i32 i32)))
  (import "test" "equals" (func $equals (param i32 i32)))
  (import "env" "loadMessageData" (func $loadMessageData (param i32 i32 i32 i32)))
  (import "env" "messageDataLen" (func $messageDataLen (param i32) (result i32)))
  (table 0 anyfunc)
  (memory $0 1)
  (data (i32.const 12) "\00\00\00\00")
  (export "memory" (memory $0))
  (export "onMessage" (func $onMessage))
  (func $onMessage (param $0 i32)
    (local $1 i32)
    (set_local $1
      (call $messageDataLen
        (get_local $0)
      )
    )
    (call $loadMessageData
      (get_local $0)
      (i32.const 0)
      (i32.load offset=12
        (i32.const 0)
      )
      (get_local $1)
    )
    (i32.store offset=12
      (i32.const 0)
      (i32.add
        (tee_local $0
          (i32.load offset=12
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
    (i32.store offset=12
      (i32.const 0)
      (i32.add
        (tee_local $0
          (i32.load offset=12
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
    (i32.store offset=12
      (i32.const 0)
      (i32.add
        (tee_local $0
          (i32.load offset=12
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
    (i32.store offset=12
      (i32.const 0)
      (i32.add
        (tee_local $0
          (i32.load offset=12
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
    (i32.store offset=12
      (i32.const 0)
      (i32.add
        (tee_local $0
          (i32.load offset=12
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
