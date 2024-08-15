import { useSelector } from 'react-redux';
import { sendAnalyticsEvents } from '../../analytics';
import { selectEventsData } from '../store/events';

export const useSendEvents = ({
	extraPathname = '',
}: { extraPathname?: string } = {}) => {
  const eventsData = useSelector(selectEventsData);

  return (eventName: string, eventParams: {[key: string]: any} = {}) => {
    // console.count(eventName); // uncomment to check event duplication
    const pathName = { screen_name: (eventParams?.screen_name || extraPathname || window.location.pathname).replace('/', '') };
    const extendedEventsData = { ...eventsData, ...eventParams, ...pathName };

    sendAnalyticsEvents(eventName, extendedEventsData);
  };
};
