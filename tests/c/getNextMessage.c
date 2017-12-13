typedef int message;

extern void getNextMessage(int timeout, void (*callback)());
extern void equals(int, int);

int test = 0;

void timeout (){
  equals(test, 2);
}

void onCreation(message m)
{
  test = 1;
  getNextMessage(80, &timeout);
}

void onMessage (message m) {
  equals(test, 1);
  test = 2;
  getNextMessage(0, &timeout);
}
