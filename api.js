const path = require('path')
const Products = require('./products')
const autoCatch = require('./lib/auto-catch')

/**
 * Handle the root route
 * @param {object} req
 * @param {object} res
*/
function handleRoot(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  }
  
  /**
   * List all products
   * @param {object} req
   * @param {object} res
   */
  async function listProducts(req, res) {

    // res.setHeader('Access-Control-Allow-Origin', '*')

    const {offset = 0, limit = 25, tag} = req.query;
    
    try {

      res.json(await Products.list({
        offset: Number(offset),
        limit: Number(limit),
        tag,
      }))
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }


  async function getProduct ( req, res, next){
    // res.setHeader('Access-Control-Allow-Origin', '*')

    const {id} = req.params;

    try {
const product = await Products.get(id)
if (!product) {
  return next()

}
return res.json(product)

    } catch (err) {
      res. status(500).json({error: err.message})
    }
  }
  async function createProduct (req, res) {
    console.log('request body:', req.body)
    res.json(req.body)
  }
/**
 * Delete a product
 * @param {string} id
 * @returns {Promise<void>}
 */
  async function deleteProduct(req, res) {
    const { id } = req.params;
  
    await Products.delete(id); // Call the delete method in products.js
    console.log(`Product with id ${id} has been deleted.`);
    res.status(202).json({ message: `Product with id ${id} has been deleted.` });
  }
  /**
 * Update a product
 * @param {object} req
 * @param {object} res
 */
async function updateProduct(req, res) {
  const { id } = req.params;
  const updatedProduct = req.body;

  await Products.update(id, updatedProduct); // Call the update method in products.js
  console.log(`Product with id ${id} has been updated.`);
  res.status(200).json({ message: `Product with id ${id} has been updated.`, updatedProduct });
}
  
  module.exports = autoCatch({
    handleRoot,
    listProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct,
    
  });