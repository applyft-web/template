export const useEventNameConstructor = ({ screenId = '' }: { screenId?: string }) => {
  const keys = {
    load: '__screen__load',
    click: '__click',
  };
  
  return (eventKey: 'load' | 'click') => {
    return `${screenId}${keys[eventKey]}`;
  };
};
