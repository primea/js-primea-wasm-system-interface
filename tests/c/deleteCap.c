typedef int message;

extern void deleteMessage(int index);
extern void storeMessage(int index, message);
extern void loadMessage(int index, void (*callback)(message));

void loadCb (message m) {
  deleteMessage(0);
}

void onCreation(message m)
{
  storeMessage(0, m);
}

void onMessage(message m)
{
  loadMessage(0, &loadCb);
}

