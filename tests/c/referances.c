#include <stdbool.h>

typedef int cap;

extern cap mintCap();
extern bool isValidRef(int);
extern void deleteRef(int);
extern void equals(int, int);

void onCreation()
{
  cap c = mintCap();
  equals(c, 1);

  bool is_valid = isValidRef(c);
  equals(is_valid, true);

  deleteRef(c);

  is_valid = isValidRef(c);
  equals(is_valid, false);
}
