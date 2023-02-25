import { useCallback, useState } from 'react';

import { getUrlParamActions } from './getUrlParamActions';
import type { GetUrlParamActionsParams } from './getUrlParamActions';

type UseUrlParamsParams<T> = GetUrlParamActionsParams & {
  parseData?: (data: any) => T;
};

const defaultParseData = <T>(data: any): T => data;

export const useUrlParams = <T>({
  name,
  search,
  navigate,
  convertParamToUrl,
  parseParamFromUrl,
  parseData = defaultParseData,
}: UseUrlParamsParams<T>) => {
  const [getInitialParam, setParamToUrl] = getUrlParamActions<T>({
    name,
    search,
    navigate,
    convertParamToUrl,
    parseParamFromUrl,
  });

  const [param, setParam] = useState(() => parseData(getInitialParam()));

  const handleParamChange = useCallback(
    (newParam: T) => {
      setParam(newParam);
      setParamToUrl(newParam);
    },
    [setParamToUrl]
  );

  return [param, handleParamChange] as const;
};
