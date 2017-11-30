typedef int cap;
typedef int message;

extern cap loadMessageCap(message, int index);
extern void storeCap(int index, cap);
extern cap loadCap(int);
extern void equals(int, int);

const char * capName = "test";

void onCreation(message m)
{
  const cap p = loadMessageCap(m, 0);
  storeCap(0, p);
}

void onMessage(message m)
{
  const cap p = loadCap(0);
  equals(p, 1);
}
