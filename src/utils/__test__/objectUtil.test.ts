import { trimObject } from "../objectUtil";

describe("trimObject", () => {

  it("should trim all string values in the object", () => {

    const obj = {
      name:" Marco   "
    }


    const result = trimObject(obj);

    expect(result).toMatchObject({
      name:"Marco"
    });

  });


  it("should not trim non string values in the object", () => {

    const obj = {
      id:23
    }


    const result = trimObject(obj);

    expect(result.id).toBe(23);

  })


  it("should trim all string values in the object recursively", ()=>{
    const obj = {
      name:" Marco   ",
      address:{
        street:"  123 Main St  "
      }
    }

    const result = trimObject(obj,{
      recursive:true
    });

    expect(result).toMatchObject({
      name:"Marco",
      address:{
        street:"123 Main St"
      }
    });

  })


  it("should trim all string values in the object select keys", ()=>{

    const obj = {
      name:" Marco   ",
      lastName:"  Polo  "
    }


    const result = trimObject(obj,{
      recursive:false,
      include:["name"]
    });


    expect(result).toMatchObject({
      name:"Marco",
      lastName:"  Polo  "
    });

  })

});