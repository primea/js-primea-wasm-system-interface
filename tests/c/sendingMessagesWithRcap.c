typedef int cap;
typedef int message;

extern cap loadMessageCap(message, int index);
extern message createMessage(int, int);
extern void sendMessage(cap, message);
extern void setResponseCap(message, cap);
extern void equals(int, int);
extern cap mintCap(int);

void onCreation(message m)
{
  const cap c = loadMessageCap(m, 0);
  const cap response = mintCap(0);
  const message rMsg = createMessage(0, 0);
  setResponseCap(rMsg, response);
  sendMessage(c, rMsg);
}

void onMessage(message m) {
  equals(1, 1);
}
