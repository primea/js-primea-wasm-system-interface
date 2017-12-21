typedef int message;
typedef int cap;

extern cap mintCap(int);
extern int getMessageTag(message);
extern void addCapToMessage(message, cap);
extern void setResponseCap(message, cap);
extern message createMessage(const char*, int);
extern void createActor(message);
extern void equals(int, int);

// childContract.wasm 
const char child_contract[154] = {0,97,115,109,1,0,0,0,1,16,3,96,2,127,127,1,127,96,2,127,127,0,96,1,127,0,2,60,3,3,101,110,118,13,99,114,101,97,116,101,77,101,115,115,97,103,101,0,0,3,101,110,118,14,108,111,97,100,77,101,115,115,97,103,101,67,97,112,0,0,3,101,110,118,11,115,101,110,100,77,101,115,115,97,103,101,0,1,3,2,1,2,4,4,1,112,0,0,5,3,1,0,1,7,23,2,6,109,101,109,111,114,121,2,0,10,111,110,67,114,101,97,116,105,111,110,0,3,10,24,1,22,1,1,127,65,0,65,0,16,0,33,1,32,0,65,0,16,1,32,1,16,2,11}; 

void onCreation()
{
  const message m = createMessage(child_contract, 154);
  const cap rCap = mintCap(66);
  addCapToMessage(m ,rCap);
  createActor(m);
}

void onMessage(message m) {
  const int tag = getMessageTag(m);
  equals(tag, 66);
}
