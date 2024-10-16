export const setAFCustomerId = (userId: string) =>
  window.AF?.('pba', 'setCustomerUserId', `'${userId}'`);

export const sendAFEvent = (eventName: string, eventParams: any) =>
  window.AF?.('pba', 'event', {
    eventName,
    eventType: 'EVENT',
    eventValue: eventParams,
  });
