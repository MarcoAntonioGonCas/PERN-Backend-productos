interface Options {
  include?: Array<string>,
  recursive?: boolean,
}
export const trimObject= <T extends Object>(obj: T,{
  include = undefined,
  recursive = false
}:Options = {}) => {
  
  const newObject = {...obj};

  Object.keys(newObject).forEach((key) => {

    const includeIn = include ? include.includes(key) : true;

    if(!includeIn){
      return;
    }

    const keyObj = key as keyof T;
    const value = newObject[keyObj];


    if(typeof value === 'string'){
      newObject[keyObj] = value.trim() as T[keyof T];
    }


    if(recursive && typeof value === 'object' && value !== null && !Array.isArray(value)){
      newObject[keyObj] = trimObject(value, {include, recursive});
    }
  })
  return newObject;
} 