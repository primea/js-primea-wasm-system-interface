extern void createChannel(int *, int *);
extern void equals(int, int);

int portA = 0;
int portB = 0;

void onCreation()
{
  createChannel(&portA, &portB);
  equals(portA, 1);
  equals(portB, 2);
}
