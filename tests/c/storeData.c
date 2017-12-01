typedef int message;

extern message createMessage(const char*, int);
extern int messageDataLen(message);
extern void storeData(int index, message);
extern void loadData(int index, void (*)(message));
extern void deleteData(int index);
extern void equals(int, int);


// store some data on creation
const char to_store[] = "test data";
const int MY_STORAGE_KEY = 0;
void onCreation()
{
  message m = createMessage(to_store, sizeof(to_store) - 1);
  storeData(MY_STORAGE_KEY, m);
}

void loadedDataCallback (message c) {
  equals(messageDataLen(c), sizeof(to_store) - 1);
  deleteData(MY_STORAGE_KEY);
}

void onMessage()
{
  loadData(MY_STORAGE_KEY, &loadedDataCallback);
}

