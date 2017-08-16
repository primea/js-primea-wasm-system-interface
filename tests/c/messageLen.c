typedef int message;

extern int createMessage(const char*, int);
extern int getMessageDataLen(message);
extern void equals(int, int);

int onCreation()
{
  const char * s = "\x00\x61\x73\x6d\x01\x00\x00\x00";
  message m = createMessage(s, 8);
  equals(m, 1);
  
  int len = getMessageDataLen(m);
  equals(len, 8);
}
