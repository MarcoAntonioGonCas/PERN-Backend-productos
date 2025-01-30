import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi, { SwaggerUiOptions } from 'swagger-ui-express'

const options:swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    tags:[
      {
        name: 'Products',
        description: 'API for products in the system'
      }
    ],
    info: {
      title: 'API Documentation',
      description: "API endpoints for a product management system",
      contact: {
        name: "Desmond Obisi",
        email: "info@miniblog.com",
        url: "https://github.com/DesmondSanctity/node-js-swagger"
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: "http://localhost:3000/",
        description: "Local server"
      },
      {
        url: "<your live url here>",
        description: "Live server"
      },
    ],
    
    
  },
  // looks for configuration in specified directories
  apis: ['./src/routes/*.ts'],
}

export const swaggerUiOptions: SwaggerUiOptions = {
  customCss: `
    .swagger-ui .topbar .topbar-wrapper .link {
      content: url("https://i.etsystatic.com/27469994/r/il/ab0d89/3257847579/il_1140xN.3257847579_6l0s.jpg");
      background-size: contain;
      width: 100px;
      height: 100px;
    }
  `,
  customSiteTitle: "My API Docs"
}
 
export const swaggerSpec = swaggerJsdoc(options)