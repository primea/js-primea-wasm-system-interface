typedef int cap;
typedef int message;

extern cap loadMessageCap(message, int index);
extern void storeCap(int index, cap);
extern void loadCap(int index, void (*callback)(cap));
extern void equals(int, int);

void loadedCap (cap c) {
  equals(c, 1);
}

void onCreation(message m)
{
  const cap p = loadMessageCap(m, 0);
  storeCap(0, p);
}

void onMessage(message m)
{
  loadCap(0, &loadedCap);
}

