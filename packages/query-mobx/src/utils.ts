export function replaceShallow<T>(a: T, b: T): T;

export function replaceShallow(a: any, b: any): any {
  for (const [key] of Object.entries(a)) {
    if (!(key in b)) {
      delete a[key];
    }
  }

  for (const [key, value] of Object.entries(b)) {
    if (value !== a[key]) {
      a[key] = b[key];
    }
  }
  return a;
}
