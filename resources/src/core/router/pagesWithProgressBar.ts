export const defaultPagesWithProgress: string[] = [
  '/page-name-1',
  '/page-name-2',
  '/page-name-3',
  '/signup',
  '__last_hidden',
];

const handler = {
  get: (target: Record<string, string[]>, prop: string) => {
    return prop in target ? target[prop] : defaultPagesWithProgress;
  }
};

export const ProgressBarLists: Record<string, string[]> = new Proxy({
  test1: ['/', '/test1'],
  test2: ['/', '/test2'],
}, handler);
