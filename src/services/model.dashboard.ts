import client from "../configs/database";
import PurchaseList from "./types.dashboard";

class Dashboard {
  async getCurrentOrderForUser(id: string): Promise<PurchaseList[]> {
    try {
      return client.connect().then(async (db) => {
        const order = (
          await db.query(
            `SELECT products.name, products.price, purchases.quantity FROM products
            JOIN purchases ON products.id = purchases.product_id
            JOIN orders ON orders.id = purchases.order_id WHERE orders.order_status = 'open'
            and orders.user_id = ($1)`,
            [id]
          )
        ).rows;
        db.release();
        return order;
      });
    } catch (error) {
      throw error;
    }
  }
}

export default Dashboard;
