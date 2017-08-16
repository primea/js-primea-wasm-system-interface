typedef int port;
typedef int message;

extern port loadMessagePort(message, int index);
extern void bindPort(const char *, int, port);
extern port getPort(const char *, int);
extern void equals(int, int);

port portA = 0;
port portB = 0;
const char * portName = "test";

void onCreation(message m)
{
  const port p = loadMessagePort(m, 0);
  bindPort(portName, 4, p);
}

void onMessage(message m)
{
  const char * name = "test";
  const port p = getPort(portName, 4);
  equals(p, 1);
}
