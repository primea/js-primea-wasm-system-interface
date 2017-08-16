typedef int port;
typedef int message;

extern port loadMessagePort(message, int index);
extern void sendMessage(port, message);
extern port getPort(const char *, int);
extern void bindPort(const char *, int, port);

const char * portName = "test";

void onCreation(message m)
{
  const port p = loadMessagePort(m, 0);
  bindPort(portName, sizeof(portName), p);
}

void onMessage(message m)
{
  port p = getPort(portName, sizeof(portName));
  sendMessage(p, m);
}
