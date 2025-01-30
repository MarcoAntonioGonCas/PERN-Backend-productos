import Server from '../server'
import db from "../../config/db";


jest.mock("../../config/db");

describe("Connect DB",()=>{


  
  it("should connect to DB", async () => {
    
    jest.spyOn(db, "authenticate").mockRejectedValueOnce(new Error("Error connecting to DB"));
    const consoleSpy = jest.spyOn(console, "log");
    
    const server = new Server(false);
    await server.init();
    
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Unable to connect to the database")
    )
  });
});