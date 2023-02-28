import { logger } from '../logs/logger.js';
import productServices from '../services/productServices.js';

export async function indexProducts(_, res, next) {
  try {
    const productos = await productServices.getAll();
    console.log('productos de productos: ', productos);
    res.status(200).render('products', { productos });
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
}

export async function getAllProducts(_, res, next) {
  try {
    const productos = await productServices.getAll();
    res.status(200).json(productos);
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
}

export async function addNewProduct(req, res, next) {
  try {
    const data = req.body;
    const response = await productServices.addProduct(data);
    res.status(201).json(response);
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
}

export async function getProduct(req, res, next) {
  try {
    const { params: { id } } = req
    const product = await productServices.getProductById(id);
    if (!product) {
      return res.status(404).end()
    }
    res.status(200).json(product);
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
}

export async function updateProduct(req, res, next) {
  try {
    let id = req.params.id;
    let data = req.body;
    const product = await productServices.updateProductById(id, data);
    res.status(201).json(product);
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params;
    const response = await productServices.deleteProductById(id);
    res.status(200).json(response);
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
}