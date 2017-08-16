typedef int port;
typedef int message;

extern port loadMessagePort(message, int index);
extern void bindPort(const char *, int, port);
extern void loadMessageData(message, int readOffset, char *, int len);
extern int getMessageDataLen(message);
extern void equals(int, int);

port portA = 0;
port portB = 0;
const char * portName = "test";

void onCreation(message m)
{
  // bind the intial port
  const port p = loadMessagePort(m, 0);
  bindPort(portName, sizeof(portName), p);
}

char *data;
void onMessage(message m)
{
    const int dataLen = getMessageDataLen(m);
    loadMessageData(m, 0, data, dataLen);
    for (int i = 0; i < 5; i++) {
      equals(*data++, i + 1);
    }
}
