typedef int cap;
typedef int message;

extern cap loadMessageCap(message, int index);
extern void storeMessage(int index, message);
extern void loadMessage(int index, void (*callback)(cap));
extern void equals(int, int);

void loadCb (message m) {
  const cap p = loadMessageCap(m, 0);
  equals(p, 2);
}

void onCreation(message m)
{
  storeMessage(0, m);
}

void onMessage(message m)
{
  loadMessage(0, &loadCb);
}

