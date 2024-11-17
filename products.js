const fs = require('fs').promises
const path = require('path');
const { json } = require('stream/consumers');
const productsFile = path.join(__dirname, 'data/full-products.json')

async function list(options = {}) {

    const {offset = 0, limit = 25, tag} = options;

    const data = await fs.readFile(productsFile)

    return JSON.parse(data)
    .filter(product => {
        if (!tag){
            return product
        }
        return product.tags.find(({title})=> title == tag)
    })
    .slice(offset, offset + limit)
}   

async function get(id) {
    const products = JSON.parse(await fs.readFile(productsFile))
    for (let i=0; i < products.length; i++){
        if (products[i].id === id) {
            return products[i]
          }
    }
    return null;
}
/**
 * Delete a product
 * @param {string} id
 * @returns {Promise<void>}
 */
async function deleteProduct(id) {
    console.log(`Product with id ${id} deleted.`); 
  }
  /**
 * Update a product
 * @param {string} id
 * @param {object} updatedProduct
 * @returns {Promise<void>}
 */
async function update(id, updatedProduct) {
    console.log(`Product with id ${id} updated with data:`, updatedProduct); // Simulate update
    
  }
module.exports= 
{
    list,
    get,
  delete: deleteProduct,
  update

};