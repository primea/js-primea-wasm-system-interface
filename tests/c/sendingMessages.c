typedef int cap;
typedef int message;

extern cap loadMessageCap(message, int index);
extern void sendMessage(cap, message);
extern void loadCap(int index, void (*callback)(cap));
extern void storeCap(int index, cap);

message messageToSend;

void onCreation(message m)
{
  const cap c = loadMessageCap(m, 0);
  storeCap(0, c);
}

void loadedCap (cap c) {
  sendMessage(c, messageToSend);
}

void onMessage(message m)
{
  messageToSend = m;
  loadCap(0, &loadedCap);
}
