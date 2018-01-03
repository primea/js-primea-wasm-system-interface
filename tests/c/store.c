typedef int cap;
typedef int message;
typedef int store;

extern void openStore(const char*, int len, void (*callback)(store, message, int));
extern void updateStore(store, message);
extern void deleteStore(store);
extern cap mintCap(int tag);
extern message createMessage(const char*, int len);
extern void addCapToMessage(message, cap);
extern cap messageCapLen(message);
extern int messageDataLen(message);
extern void loadMessageData(message, const char*, int, int);

extern void equals(int, int);

const char * data = "hello world";
const char* key = "test";
const char loadedData[12];

void saveToStore(store s, message m, int error) {
  equals(error, -1);
  const message toStore = createMessage(data, 11);
  const cap c = mintCap(55);
  addCapToMessage(toStore, c);
  updateStore(s, toStore);
}

void readFromStore(store s, message m, int error) {
  equals(error, 0);
  const int len = messageCapLen(m);
  equals(len, 1);
  deleteStore(s);

  const int dataLen = messageDataLen(m);
  loadMessageData(m, loadedData, 0, dataLen);
  for (int i = 0; i < dataLen; i++) {
    equals(loadedData[i], data[i]);
  }
}

void onCreation(message m)
{
  openStore(key, 4, &saveToStore);
}

void onMessage(message m) {
  openStore(key, 4, &readFromStore);
}
