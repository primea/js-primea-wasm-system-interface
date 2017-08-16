typedef int message;
typedef int port;

extern int messagePortLen(message);
extern port loadMessagePort(message, int index);
extern void equals(int, int);

int portA = 0;
int portB = 0;

void onCreation(message m)
{
  const int len = messagePortLen(m);
  equals(len, 2);
  
  port p = loadMessagePort(m, 0);
  equals(p, 1);
}
