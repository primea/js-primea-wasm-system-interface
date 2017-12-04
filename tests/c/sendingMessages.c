typedef int cap;
typedef int message;

extern cap loadMessageCap(message, int index);
extern void sendMessage(cap, message);

void onCreation(message m)
{
  const cap c = loadMessageCap(m, 0);
  sendMessage(c, m);
}
