typedef int message;
typedef int cap;

extern cap mintCap(int);
extern int getMessageTag(message);
extern void setResponseCap(message, cap);
extern message createMessage(const char*, int);
extern void createActor(message);
extern void equals(int, int);

// child.wasm 
const char * child_contract = "\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x09\x02\x60\x02\x7f\x7f\x00\x60\x00\x00\x02\x0f\x01\x04\x74\x65\x73\x74\x06\x65\x71\x75\x61\x6c\x73\x00\x00\x03\x02\x01\x01\x04\x04\x01\x70\x00\x00\x05\x03\x01\x00\x01\x07\x17\x02\x06\x6d\x65\x6d\x6f\x72\x79\x02\x00\x0a\x6f\x6e\x43\x72\x65\x61\x74\x69\x6f\x6e\x00\x01\x0a\x0a\x01\x08\x00\x41\x01\x41\x01\x10\x00\x0b\0";

void onCreation()
{
  const message m = createMessage(child_contract, 88);
  const cap rCap = mintCap(66);
  setResponseCap(m, rCap);
  createActor(m);
}

void onMessage(message m) {
  const int tag = getMessageTag(m);
  equals(tag, 66);
}
