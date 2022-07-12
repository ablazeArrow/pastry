import client from "../configs/database";
import Order from "./type.order";

class Purchases {
  //get list of products
  async getOrders(): Promise<Order[]> {
    try {
      return client.connect().then(async (db) => {
        const orders = (await db.query(`SELECT * FROM orders`)).rows;
        db.release();
        return orders;
      });
    } catch (error) {
      throw error;
    }
  }

  //get product by id
  async showOrder(id: string): Promise<Order> {
    try {
      return (await this.getOrders()).filter(
        (item) => (item.id === parseInt(id))
      )[0];
    } catch (error) {
      throw error;
    }
  }

  //add new product
  async addOrder(o: Order): Promise<Order> {
    try {
      return client.connect().then(async (db) => {
        const order = (
          await db.query(
            `INSERT INTO orders(user_id, order_status) VALUES($1, $2) RETURNING *`,
            [o.user_id, o.order_status]
          )
        ).rows[0];
        db.release();
        return order;
      });
    } catch (error) {
      throw error;
    }
  }

  //add new product to specific order
  async addProduct(
    orderId: string,
    productId: string,
    quantity: number
  ): Promise<{ order_id: string, product_id: string, quantity: number }> {
    try {
      return client.connect().then(async (db) => {
        const order = (
          await db.query(`SELECT * FROM orders WHERE id=($1)`, [orderId])
        ).rows[0];
        if (order.order_status === "closed")
          throw new Error("Order closed open new order to add your purchases");
        const addedProdect = (
          await db.query(
            `INSERT INTO purchases(order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *`,
            [orderId, productId, quantity]
          )
        ).rows[0];
        db.release();
        return addedProdect;
      });
    } catch (error) {
      throw error;
    }
  }
}

export default Purchases;
