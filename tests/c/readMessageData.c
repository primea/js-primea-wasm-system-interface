typedef int cap;
typedef int message;

extern cap loadMessageCap(message, int index);
extern void storeCap(int index, cap);
extern void loadMessageData(message, int readOffset, char *, int len);
extern int messageDataLen(message);
extern void equals(int, int);


void onCreation(message m)
{
  // bind the intial cap
  const cap p = loadMessageCap(m, 0);
  storeCap(0, p);
}

char *data;
void onMessage(message m)
{
    const int dataLen = messageDataLen(m);
    loadMessageData(m, 0, data, dataLen);
    for (int i = 0; i < 5; i++) {
      equals(*data++, i + 1);
    }
}
