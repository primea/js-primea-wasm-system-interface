typedef int message;
typedef int cap;

extern int getMessageTag(message);
extern void equals(int, int);

void onCreation(message m)
{
  const int tag = getMessageTag(m);
  equals(tag, 2);
}
