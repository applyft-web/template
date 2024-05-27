export const setAFCustomerId = (userId: string) => {
  return window.AF?.('pba', 'setCustomerUserId', `'${userId}'`);
};

export const sendAFEvent = (eventName: string, eventParams: any) => {
  return window.AF?.('pba', 'event', {eventType: 'EVENT', eventName: eventName, eventValue: eventParams});
};
