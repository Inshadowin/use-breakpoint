import { isEmpty } from './isEmpty';

export const defaultConvertParamToUrl = <T>(p: T) =>
  !isEmpty(p) ? JSON.stringify(p) : '';
