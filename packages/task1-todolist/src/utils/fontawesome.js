import fontawesome from '@fortawesome/fontawesome';
import {
  faCalendarAlt,
  faFile,
  faCommentDots
} from '@fortawesome/fontawesome-free-regular';
import {
  faPencilAlt,
  faCheck,
  faTimes,
  faPlus
} from '@fortawesome/fontawesome-free-solid';

import { __DEV__ } from '../config/env';

let icons = null;
if (__DEV__) {
  const brands = require('@fortawesome/fontawesome-free-brands').default;
  const regular = require('@fortawesome/fontawesome-free-regular').default;
  const solid = require('@fortawesome/fontawesome-free-solid').default;
  icons = [brands, regular, solid];
} else {
  icons = [
    faCalendarAlt,
    faFile,
    faCommentDots,
    faPencilAlt,
    faCheck,
    faTimes,
    faPlus
  ];
}

fontawesome.library.add(...icons);
