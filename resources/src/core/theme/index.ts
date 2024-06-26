// get the theme from the library if you need to use it in js/ts (not in styled-components css)
// in this case PRODUCT_NAME have to be one of the reserved project names (check type ProjectName)
// use this case when you are not able to use "useTheme" from styled-components for some reason

import { type Theme, type ProjectName, getTheme } from '@applyft-web/ui-components';
import { PRODUCT_NAME } from '../constants';

export const theme: Theme = getTheme(PRODUCT_NAME as ProjectName);
