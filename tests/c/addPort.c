typedef int message;
typedef int port;

extern message createMessage(const char*, int);
extern void createChannel(port *, port *);
extern void addPortToMessage(message, port);
extern int messagePortLen(message);
extern void equals(int, int);

port portA = 0;
port portB = 0;

void onCreation()
{
  const char * s = "\x00\x61\x73\x6d\x01\x00\x00\x00";
  message m = createMessage(s, 8);
  createChannel(&portA, &portB);
  addPortToMessage(m, portA);
  const int len = messagePortLen(m);
  equals(len, 1);
  equals(portB, 3);
}
