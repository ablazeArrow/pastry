import client from "../configs/database";
import Pastry from "./type.product";

class Product {
  //get list of products
  async getItems(): Promise<Pastry[]> {
    try {
      return client.connect().then(async (db) => {
        const items = (await db.query(`SELECT * FROM products`)).rows;
        db.release();
        return items;
      })
    } catch (error) { throw error; }
  }

  //get product by id
  async showItem(id: string): Promise<Pastry> {
    try {
      return (await this.getItems()).filter(item => item.id === parseInt(id))[0]
    } catch (error) { throw error; }
  }

  //add new product 
  async addItem(Item: Pastry): Promise<Pastry> {
    try {
      return client.connect().then(async (db) => {
        const rows = (
          await db.query(
            `INSERT INTO products(name, price) VALUES($1, $2) RETURNING *`,
            [Item.name, Item.price]
          )
        ).rows[0];
        db.release();
        return rows;
      });
    } catch (error) { throw error; }
  }
}

export default Product;
