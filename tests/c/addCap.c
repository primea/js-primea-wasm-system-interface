typedef int message;
typedef int cap;

extern message createMessage(const char*, int);
extern cap mintCap();
extern void addCapToMessage(message, cap);
extern int messageCapLen(message);
extern void equals(int, int);

void onCreation()
{
  const char * s = "\x00\x61\x73\x6d\x01\x00\x00\x00";
  message m = createMessage(s, 8);
  cap capA = mintCap();
  addCapToMessage(m, capA);
  const int len = messageCapLen(m);
  equals(len, 1);
  equals(capA, 2);
}
