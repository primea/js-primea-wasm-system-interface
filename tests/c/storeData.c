typedef int message;

extern message createMessage(const char*, int);
extern int messageDataLen(message);
extern void storeData(int index, message);
extern void loadData(int index, void (*)(message));
extern void deleteData(int index);
extern void equals(int, int);


// store some data on creation
const char to_store[] = "test data";
void onCreation()
{
  message m = createMessage(to_store, sizeof(to_store) - 1);
  storeData(0, m);
}

void loadedDataCallback (message c) {
  equals(messageDataLen(c), sizeof(to_store) - 1);
  deleteData(0);
}

void onMessage()
{
  loadData(0, &loadedDataCallback);
}

