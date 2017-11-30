typedef int cap;
typedef int message;

extern cap loadMessageCap(message, int index);
extern void storeCap(int index, cap);
extern cap deleteCap(int index, int);

void onCreation(message m)
{
  const cap p = loadMessageCap(m, 0);
  storeCap(0, p);
}

void onMessage(message m)
{
  deleteCap(0, 4);
}
