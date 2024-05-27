import { useSelector } from 'react-redux';
import { sendAnalyticsEvents } from '../../analytics';
import { selectEventsData } from '../store/events';

export const useSendEvents = ({
	extraPathname = '',
}: { extraPathname?: string } = {}) => {
  const eventsData = useSelector(selectEventsData);

  return (eventName: string, eventParams: object = {}) => {
    const pathName = { screen_name: (extraPathname || window.location.pathname).replace('/', '') };
    const extendedEventsData = { ...eventsData, ...eventParams, ...pathName };

    sendAnalyticsEvents(eventName, extendedEventsData);
  };
};
