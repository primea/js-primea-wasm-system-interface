typedef int port;
typedef int message;

extern port loadMessagePort(message, int index);
extern void bindPort(const char *, int, port);

port portA = 0;
port portB = 0;

const char * portName = "test";
void onCreation(message m)
{
  const port p = loadMessagePort(m, 0);
  bindPort(portName, sizeof(portName), p);
}
