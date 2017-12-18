typedef int message;
typedef int cap;

extern int messageCapLen(message);
extern cap loadMessageCap(message, int index);
extern void equals(int, int);

void onMessage(message m)
{
  const int len = messageCapLen(m);
  equals(len, 2);
  
  cap p = loadMessageCap(m, 0);
  equals(p, 1);
}
