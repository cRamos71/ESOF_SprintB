import { Request, Response } from "express";
import {
  createProduct,
  showProducts,
  updateProduct,
  deleteProduct,
} from "../services/product-service";

export const create = async (req: Request, res: Response) => {
  const product = await createProduct({
    name: req.body.name,
    price: req.body.price,
  });

  return res.status(200).json({
    message: "Succes Create Product",
    data: product,
  });
};

export const show = async (req: Request, res: Response) => {
  const products = await showProducts();

  return res.status(200).json({
    message: "List Data Product",
    data: products,
  });
};

export const update = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const product = await updateProduct(
    {
      name: req.body.name,
      price: req.body.price,
    },
    id
  );

  return res.status(200).json({
    message: "Success Update Product",
    data: product,
  });
};

export const remove = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const product = await deleteProduct(id);

  return res.status(200).json({
    message: "Success Delete Product",
    data: product,
  });
};