import { defaultConvertParamToUrl } from './defaultConvertParamToUrl';
import { defaultParseParamFromUrl } from './defaultParseParamFromUrl';

export type GetUrlParamActionsParams = {
  name: string;
  search: string;
  navigate: (path: string) => void;
  parseParamFromUrl?: <T>(p: any) => T;
  convertParamToUrl?: <T>(p: T) => string;
};

export const getUrlParamActions = <T>({
  name,
  search,
  navigate,
  convertParamToUrl = defaultConvertParamToUrl,
  parseParamFromUrl = defaultParseParamFromUrl,
}: GetUrlParamActionsParams) => {
  const getParamFromUrl = () => {
    try {
      const param = new URLSearchParams(search).get(name);

      return parseParamFromUrl<T>(param);
    } catch (ex) {
      return undefined;
    }
  };

  const setParamToUrl = (param: T) => {
    const params = new URLSearchParams(search);
    const urlParam = convertParamToUrl(param);

    urlParam ? params.set(name, urlParam) : params.delete(name);

    navigate(`?${params.toString()}`);
  };

  return [getParamFromUrl, setParamToUrl] as const;
};
