typedef int cap;
typedef int message;

extern cap loadMessageCap(message, int index);
extern void sendMessage(cap, message);

void timeout () {
  // clean up here
}

void onCreation(message m)
{
  const cap c = mintCap(88)
  sendMessage(c, m);
  getNextMessageByTag(88, 999, &timeout);
}

void onMessage(message, m) {
  // contune

}
