enum container_type {STORAGE, WASM};
typedef int portHandle;

extern portHandle createContainer(enum container_type, const char*, int);
extern void equals(portHandle, int);

int main()
{
  const char * s = "\x00\x61\x73\x6d\x01\x00\x00\x00";
  enum container_type r = WASM;
  portHandle port = createContainer(r, s, 8);
  equals(port, 0);
}
