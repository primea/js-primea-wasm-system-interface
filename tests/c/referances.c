#include <stdbool.h>

typedef int port;

extern void createChannel(port *, port *);
extern bool isValidRef(int);
extern void deleteRef(int);
extern void equals(int, int);

port portA = 0;
port portB = 0;

void onCreation()
{
  createChannel(&portA, &portB);
  equals(portA, 1);
  equals(portB, 2);

  bool is_valid = isValidRef(portA);
  equals(is_valid, true);

  deleteRef(portA);

  is_valid = isValidRef(portA);
  equals(is_valid, false);
}
