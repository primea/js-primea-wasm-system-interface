typedef int cap;

extern cap mintCap();
extern void equals(int, int);

void onCreation()
{
  cap capA = mintCap();
  equals(capA, 1);
}
