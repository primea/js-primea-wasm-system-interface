typedef int message;

extern void loadMessageData(message, int readOffset, char *, int len);
extern int messageDataLen(message);
extern void equals(int, int);

char *data;
void onMessage(message m)
{
    const int dataLen = messageDataLen(m);
    loadMessageData(m, 0, data, dataLen);
    for (int i = 0; i < 5; i++) {
      equals(*data++, i + 1);
    }
}
