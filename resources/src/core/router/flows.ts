export const getFlow = (landingType: string): string[] | null => {
  let flow = flows[landingType];
  if (landingType === 'fullPrice') return defaultFlow;
  if (!flow) {
    const [, ...rest] = defaultFlow;
    flow = [`/${landingType}`, ...rest];
  }

  return flow;
};

export const defaultFlow: string[] = [
  '/',
  '/q',
  '/creating-profile',
  '/signup',
  '/checkout',
  '/success',
];

const flows: Record<string, string[]> = {
  'example': ['/example', '/q2', '/q3']
};
