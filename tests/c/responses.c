typedef int message;
typedef int cap;

extern void equals(int, int);
extern message createMessage(const char*, int, cap);
extern void respond(message);

void onCreation(message m)
{
  equals(m, 0);
  const message rMsg = createMessage(0, 0, -1);
  respond(rMsg);
}
