// to={(location: Location) => {
//     const parsed = queryString.parse(location.search);
//     parsed.page = page.toString();
//     const nextLocation: LocationDescriptorObject = {};
//     nextLocation.search = queryString.stringify(parsed);
//     return nextLocation;
//   }}
import { LocationDescriptorObject, Location } from "history";
import queryString from "query-string";

interface QueryToAddObj {
  queryName: string;
  queryValue: string;
}
export const linkToProp = (queryToAdd: QueryToAddObj[]) => {
  return (location: Location) => {
    const parsed = queryString.parse(location.search);
    queryToAdd.forEach((queryAddInfo) => {
      parsed[queryAddInfo.queryName] = queryAddInfo.queryValue;
    });
    const nextLocation: LocationDescriptorObject = { ...location };
    nextLocation.search = queryString.stringify(parsed);
    return nextLocation;
  };
};
