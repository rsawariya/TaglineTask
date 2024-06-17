type InputObject = {
  [key: string]: string | number;
};

type OutputObject = {
  [key: string]: Array<string | number>;
};

export default function halperDataToFilter(arr: InputObject[]): OutputObject {
  const result: OutputObject = {};

  arr.forEach(obj => {
    Object.keys(obj).forEach(key => {
      if (!result[key]) {
        result[key] = [];
      }
      if (!result[key].includes(obj[key])) {
        result[key].push(obj[key]);
      }
    });
  });

  return result;
}