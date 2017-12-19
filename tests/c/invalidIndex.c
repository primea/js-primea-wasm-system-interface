typedef int cap;
typedef int message;

extern cap loadMessageCap(message, int index);

void onCreation(message m)
{
  const cap p = loadMessageCap(m, 0);
}
