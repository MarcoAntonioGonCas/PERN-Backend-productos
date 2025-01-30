import request from 'supertest'
import Server from '../../models/server'
import qs from 'qs'

describe('POST: /api/productors', () => {
  let server;

  it("Should display validation error", async()=>{

    server = new Server();
    const response = await request(server.app).post('/api/products').send({})

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors).toHaveLength(2)

    expect(response.status).not.toBe(404)
    expect(response.status).not.toBe(500)
    expect(response.body.errors).not.toHaveLength(3)


  });

  it("should validate that the price is a greater than 0", async () => {
    
    server = new Server();
    const response = await request(server.app).post('/api/products').send({
      name: "Monitor curvo de 24",
      price: -1,
    })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.status).not.toBe(500)
    expect(response.body.errors).not.toHaveLength(3)

  });


  it("should validate that the price is not a number", async () => {
    
    server = new Server();
    const response = await request(server.app).post('/api/products').send({
      name: "Monitor curvo de 24",
      price: "hola",
    })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.status).not.toBe(500)
    expect(response.body.errors).not.toHaveLength(3)

  });

  it("should create a new product" , async () => {

    server = new Server();
    const response = await request(server.app).post('/api/products').send({
      "name":"Monitor curvo de 24",
      "price":32.00,
      "availability":true
    })

    expect(response.status).toBe(201)
    expect(response.body.data).toHaveProperty('id')

    expect(response.body.data).toMatchObject({
      name: "Monitor curvo de 24",
      price: 32.00,
      availability: true
    })
  })
})


describe('GET /api/productors', () => {
  it('should return all products', async () => {
    const server = new Server();
    const response = await request(server.app).get('/api/products')
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.body).toHaveProperty('data')
  })
})


describe('GET products paginated /api/productors/list ', () => {
  it('should return all products', async () => {
    const server = new Server();
    const response = await request(server.app)
      .get('/api/products/list')
      .query({
        pageIndex: 1,
        pageSize: 20
      })
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toHaveProperty('items')

  })

  it("should return a 400 if the query params are not numbers", async () => {
    const server = new Server();
    const response = await request(server.app)
      .get('/api/products/list')
      .query({
        pageIndex: "hola",
        pageSize: "mundo"
      })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(2)
  });

  it("should return a data paginated sorted by name and order by name asc", async () => {
    const server = new Server();
    const response = await request(server.app)
      .get('/api/products/list')
      .query(qs.stringify({
        pageIndex: 1,
        pageSize: 20,
        order:[
          {
            column: "name",
            dir: "ASC"
          }
        ],
        search:[
          {
            column: "name",
            value: "Monitor curvo de 24"
          }
        ]
      }))

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toHaveProperty('items')
    expect(response.body.data.totalFiltered).toBe(1)

  })

})


describe('GET /api/products/:id', () => {

  it('should return a product by id', async () => {
    const server = new Server();
    const response = await request(server.app).get('/api/products/1')
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toHaveProperty('id')
  })

  it('should return a 404 if the product does not exist', async () => {
    const server = new Server();
    const response = await request(server.app).get('/api/products/1000')
    expect(response.status).toBe(404)
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.body).toHaveProperty('message')
    
  })

  it('should return a 400 if the id is not a number', async () => {
    const server = new Server();
    const response = await request(server.app).get('/api/products/hola')
    expect(response.status).toBe(400)
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
  })
})


describe('PUT /api/products/:id', () => {

  it('should return a 400 if the id is not a number', async () => {
    const server = new Server();
    const response = await request(server.app).put('/api/products/hola')
    expect(response.status).toBe(400)
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
  })

  it('should return a 404 response for a non-existend product', async () => {

    const server = new Server();
    const response = await request(server.app).put('/api/products/323').send({
      id: 323,
      name: "Monitor curvo de 24",
      price: 32.00,
      availability: true
    })

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message')
    expect(response.body.statusCode).toBe(404)
    expect(response.body.message).toBe('El producto no existe')
    expect(response).not.toHaveProperty('data')
 

  })

  it('should display validation error message when updating a product', async () => {

    const server = new Server();
    const response = await request(server.app).put('/api/products/1').send()

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(4)
    expect(response.body.errors).toBeTruthy()

    expect(response).not.toHaveProperty('data')
 

  })




  it('should display validation that the price is greater than 0', async () => {

    const server = new Server();
    const response = await request(server.app).put('/api/products/1').send({
      id: 1,
      name: "Monitor curvo de 24",
      price: -1,
      availability: true
    })


    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].message).toBe('El precio debe ser mayor a 0')
  })  

  it('should update a product', async () => {

    const server = new Server();
    const response = await request(server.app).put('/api/products/1').send({
      id: 1,
      name: "Monitor curvo de 24 editado",
      price: 32.00,
      availability: true
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toMatchObject({
      id: 1,
      name: "Monitor curvo de 24 editado",
      price: 32.00,
      availability: true
    })
  })

  it('should return a 400 if the id in the params does not match the id in the body', async () => {

    const server = new Server();
    const response = await request(server.app).put('/api/products/1').send({
      id: 2,
      name: "Monitor curvo de 24 editado",
      price: 32.00,
      availability: true
    })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].message).toBe('The id in the params does not match the id in the body')
  })


  it("should update a product remove white spaces", async () => {

    const server = new Server();
    const response = await request(server.app).put('/api/products/1').send({
      id:1,
      name:"        Monitor curvo de 24      ",
      price:32.00,
      availability:true
    })

    expect(response.status).toBe(200)
    expect(response.body.data).toHaveProperty('id')

    expect(response.body.data).toMatchObject({
      name: "Monitor curvo de 24",
      price: 32.00,
      availability: true
    })
  })
 
})


describe('PATCH /api/products/:id', () => {
  
  const server = new Server();

  it("shpuld return a 400 if the id is not a number", async () => {
    const response = await request(server.app).patch('/api/products/hola')
    expect(response.status).toBe(400)
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.body).not.toHaveProperty('data')
  })


  it("should return a 404 if the product does not exist", async () => {
    const response = await request(server.app).patch('/api/products/1000').send({
      availability: true
    });

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('El producto no existe')
    expect(response.body).not.toHaveProperty('data')

  })

  it("should update the availability of a product", async () => {
    const response = await request(server.app).patch('/api/products/1').send({
      availability: false
    });
    
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toHaveProperty('id')
    expect(response.body.data).toHaveProperty('availability')
    expect(response.body.data.availability).toBe(false)
    expect(response.status).not.toBe(400)
    expect(response.status).not.toBe(404)
    expect(response.status).not.toBe(500)
  })

})

describe('DELETE /api/products/:id', () => {

  const server = new Server();


  it('should return a 400 if the id is not a number', async () => {

    const response = await request(server.app).delete('/api/products/hola')
    expect(response.status).toBe(400)
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)

  })


  it("should return a 404 if the product does not exists",async ()=>{

    const response = await request(server.app).delete('/api/products/1000')

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('El producto no existe')
  });


  it("should delete a product", async () => {

    const response = await request(server.app).delete("/api/products/1");


    expect(response.status).toBe(200)
    expect(response.body.data).toHaveProperty('id')
    expect(response.body.data.id).toBe(1)
  })
})