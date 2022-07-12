import Purchases from "../orders/model.order"
import Product from "../products/model.products"
import Dashboard from "../services/model.dashboard"
import User from "../users/model.user"
import app from "../app";
import supertest from "supertest";


const user = new User()
const product = new Product()
const orderList = new Purchases()
const dashboard = new Dashboard()

const request = supertest(app);
let validToken = "";

describe(`test routes and models methods`, () => {
    describe('Model Methods existence', () => {
        it('getUsers should be defined', () => { expect(user.getUsers).toBeDefined() })
        it('showUser should be defined', () => { expect(user.showUser).toBeDefined() })
        it('register should be defined', () => { expect(user.register).toBeDefined() })
        it('signIn should be defined', () => { expect(user.signIn).toBeDefined() })

        it('getItems should be defined', () => { expect(product.getItems).toBeDefined() })
        it('showItem should be defined', () => { expect(product.showItem).toBeDefined() })
        it('addItem should be defined', () => { expect(product.addItem).toBeDefined() })

        it('getOrders should be defined', () => { expect(orderList.getOrders).toBeDefined() })
        it('showOrder should be defined', () => { expect(orderList.showOrder).toBeDefined() })
        it('addOrder should be defined', () => { expect(orderList.addOrder).toBeDefined() })
        it('addProduct should be defined', () => { expect(orderList.addProduct).toBeDefined() })

        it('getCurrentOrderForUser should be defined', () => { expect(dashboard.getCurrentOrderForUser).toBeDefined() })
    })

    describe(`Testing User routes and model methods`, () => {
        const testUser1 = {
            username: "user1",
            firstname: "firstname1",
            lastname: "lastname1",
            password: "password1",
        };
        const testUser2 = {
            username: "user2",
            firstname: "firstname2",
            lastname: "lastname2",
            password: "password2",
        };

        it('create route and register method should add new user', async () => {
            const user1 = await user.register(testUser1)
            const user2 = await request
                .post("/users")
                .set("Content-type", "application/json")
                .send(testUser2);
            expect(user1.id).toBe(1);
            expect(user1.username).toEqual('user1');
            expect(user2.status).toBe(200);
            expect(user2.body.id).toBe(2);
            expect(user2.body.username).toEqual('user2');
        })

        it('authenticate route and signIn method should authenticate user', async () => {
            const user1 = await user.signIn(testUser1.username, testUser1.password)
            const user2 = await request
                .post("/users/auth")
                .set("Content-type", "application/json")
                .send({ username: testUser2.username, password: testUser2.password });
            validToken = user2.body.token
            expect(user1?.id).toBe(1 || null);
            expect(user1?.username).toEqual('user1' || null);
            expect(user2.status).toBe(200);
            expect(user2.body.id).toBe(2);
            expect(user2.body.username).toEqual('user2');
            expect(validToken).toBeTruthy();
        })

        it('index route and getUsers method should return list of users', async () => {
            const userList1 = await user.getUsers()
            const userList2 = await request
                .get("/users")
                .set("Content-type", "application/json")
                .set("Authorization", `bearer ${validToken}`);
            expect(userList1.length).toBe(2);
            expect(userList1).toEqual([
                { ...testUser1, id: 1, password: userList1[0].password },
                { ...testUser2, id: 2, password: userList2.body[1].password }]);
            expect(userList2.status).toBe(200);
            expect(userList2.body.length).toBe(2);
            expect(userList2.body).toEqual(userList1);
        })

        it(`show route and showUser method should return user with specify id`, async () => {
            const u1 = await user.showUser('1')
            expect(u1.id).toBe(1)
            expect(u1.username).toBe('user1')

            const u2 = await request
                .get("/users/2")
                .set("content-type", "application/json")
                .set("Authorization", `bearer ${validToken}`);
            expect(u2.status).toBe(200);
            expect(u2.body.id).toBe(2)
            expect(u2.body.username).toBe('user2')
        })

    })

    describe(`Testing products routes and model methods`, () => {
        const testProduct1 = { name: "kunafa", price: 10 };
        const testProduct2 = { name: "Umm Ali", price: 20 };
        it(`create route and addItem should add new product`, async () => {
            const product1 = await product.addItem(testProduct1)
            expect(product1.id).toEqual(1)
            expect(product1.name).toEqual("kunafa")

            const product2 = await request
                .post("/products")
                .set("Content-type", "application/json")
                .send(testProduct2)
                .set("Authorization", `bearer ${validToken}`);
            expect(product2.status).toBe(200);
            expect(product2.body.id).toEqual(2)
            expect(product2.body.name).toEqual("Umm Ali")
        })
        it(`index route and getItems should get all products`, async () => {
            const itemssList1 = await product.getItems()
            expect(itemssList1.length).toBe(2)
            expect(itemssList1).toEqual([
                { ...testProduct1, id: 1, price: itemssList1[0].price },
                { ...testProduct2, id: 2, price: itemssList1[1].price }])

            const itemssList2 = await request
                .get("/products")
                .set("content-type", "application/json")
                .set("Authorization", `bearer ${validToken}`);
            expect(itemssList2.status).toBe(200);
            expect(itemssList2.body).toEqual(itemssList1)


        })

        it(`show route and showItem method should gets product with specific id`, async () => {
            const product1 = await product.showItem('1')
            expect(product1).toEqual({ ...testProduct1, id: 1, price: product1.price })

            const product2 = await request
                .get("/products/2")
                .set("content-type", "application/json")
                .set("Authorization", `bearer ${validToken}`);
            expect(product2.status).toBe(200);
            expect(product2.body).toEqual({ ...testProduct2, id: 2, price: product2.body.price })
        })

        // it(``,async () => { })
    })

    describe(`Testing orders routes and model methods`, () => {
        const testOrder1 = { user_id: '1', order_status: "open" };
        const testOrder2 = { user_id: '1', order_status: "close" };

        it(`create route and addOrder method should add new order`, async () => {
            const order1 = await orderList.addOrder(testOrder1)
            expect(order1).toEqual({ ...testOrder1, id: 1 })

            const order2 = await request
                .post("/orders")
                .set("Content-type", "application/json")
                .send(testOrder2);
            expect(order2.status).toBe(200);
            expect(order2.body).toEqual({ ...testOrder2, id: 2 })
        })

        it(`index route and getOrders method should get list of orders`, async () => {
            const list1 = await orderList.getOrders()
            expect(list1.length).toBe(2)
            expect(list1).toEqual([{ ...testOrder1, id: 1 }, { ...testOrder2, id: 2 }])

            const list2 = await request
                .get("/orders")
                .set("content-type", "application/json")
                .set("Authorization", `bearer ${validToken}`);
            expect(list2.status).toBe(200);
            expect(list2.body).toEqual(list1);
        })

        it(`show route and showOrder method should get specific order`, async () => {
            const order1 = await orderList.showOrder('1')
            expect(order1).toEqual({ ...testOrder1, id: 1 })

            const order2 = await request
                .get("/orders/2")
                .set("content-type", "application/json");
            expect(order2.status).toBe(200);
            expect(order2.body).toEqual({ ...testOrder2, id: 2 })


        })

        it(`create and addProduct method sould add new product to specific order`, async () => {
            const purchases1 = await orderList.addProduct('1', '1', 5)
            expect(purchases1).toEqual({ order_id: '1', product_id: '1', quantity: 5 })

            const purchases2 = await request
                .post("/orders/1/products")
                .set("content-type", "application/json")
                .set("Authorization", `bearer ${validToken}`)
                .send({ order_id: '1', product_id: '2', quantity: 33 });
            expect(purchases2.status).toBe(200);
            expect(purchases2.body).toEqual({ order_id: '1', product_id: '2', quantity: 33 })
        })
    })

    describe(`getCurrentOrderForUser`, async () => {
        it(`should get all products in current order for specific user`, async () => {
            const currentOrder1 = await dashboard.getCurrentOrderForUser('1')
            expect(currentOrder1).toEqual([
                { name: "kunafa", price: currentOrder1[0].price, quantity: 5 },
                { name: "Umm Ali", price: currentOrder1[1].price, quantity: 33 }])

            const currentOrder2 = await request
                .get("/users/1/active-order")
                .set("Content-type", "application/json")
                .set("Authorization", `bearer ${validToken}`);
            expect(currentOrder2.status).toBe(200);
            expect(currentOrder2.body).toEqual(currentOrder1)
        })
    })
})


