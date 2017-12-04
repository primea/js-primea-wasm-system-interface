typedef int cap;
typedef int message;

extern cap loadMessageCap(message, int index);
extern void storeMessage(int, message);

void onCreation(message m)
{
  storeMessage(1, m);
}
