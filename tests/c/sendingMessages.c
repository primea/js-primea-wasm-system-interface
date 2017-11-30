typedef int cap;
typedef int message;

extern cap loadMessageCap(message, int index);
extern void sendMessage(cap, message);
extern cap loadCap(int index);
extern void storeCap(int index, cap);

void onCreation(message m)
{
  const cap c = loadMessageCap(m, 0);
  storeCap(0, c);
}

void onMessage(message m)
{
  cap c = loadCap(0);
  sendMessage(c, m);
}
