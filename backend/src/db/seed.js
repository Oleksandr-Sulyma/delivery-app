import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import dns from 'node:dns/promises';
import { Shop } from '../models/shop.js';
import { Product } from '../models/product.js';

dotenv.config();
dns.setServers(['1.1.1.1']);

const seedData = async () => {
  const uri = process.env.MONGO_URL;

  if (!uri) {
    console.error('❌ Помилка: MONGO_URL не знайдено в env!');
    process.exit(1);
  }

  try {
    console.log('⏳ Спроба підключення до MongoDB...');
    await mongoose.connect(uri);
    console.log('🌱 Підключено. Очищення бази...');

    await Shop.deleteMany({});
    await Product.deleteMany({});

    const shops = await Shop.insertMany([
      {
        name: 'Mc Donny',
        address: 'Kiev, Central St. 1',
        imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=400&auto=format&fit=crop',
        rating: 3.8,
      },
      {
        name: 'CFK',
        address: 'Kiev, Victory Ave. 45',
        imageUrl: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=400&auto=format&fit=crop',
        rating: 4.2,
      },
      {
        name: 'Sushi Master',
        address: 'Kiev, River Side 12',
        imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=400&auto=format&fit=crop',
        rating: 4.5,
      },
      {
        name: 'Pizza Felice',
        address: 'Kiev, Italian Sq. 5',
        imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400&auto=format&fit=crop',
        rating: 4.9,
      },
      {
        name: 'Green & Fresh',
        address: 'Kiev, Garden St. 8',
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop',
        rating: 4.7,
      },
    ]);

    console.log('📦 Створюємо товари...');

    const productsData = [

      { name: 'Big Burger', price: 120, category: 'Burgers', shop: shops[0]._id, imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500', isAvailable: true },
      { name: 'Double Cheese', price: 150, category: 'Burgers', shop: shops[0]._id, imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500', isAvailable: false },
      { name: 'French Fries', price: 45, category: 'Burgers', shop: shops[0]._id, imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500', isAvailable: true },
      { name: 'Chicken Burger', price: 115, category: 'Burgers', shop: shops[0]._id, imageUrl: 'https://images.unsplash.com/photo-1513185158878-8d8c196b7f81?w=500', isAvailable: true },
      { name: 'Apple Pie', price: 60, category: 'Desserts', shop: shops[0]._id, imageUrl: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=500', isAvailable: true },
      { name: 'Coca-Cola', price: 35, category: 'Drinks', shop: shops[0]._id, imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500', isAvailable: true },

      { name: 'Spicy Wings', price: 110, category: 'Burgers', shop: shops[1]._id, imageUrl: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500', isAvailable: true },
      { name: 'Chicken Bucket', price: 350, category: 'Burgers', shop: shops[1]._id, imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500', isAvailable: true },
      { name: 'Zinger Burger', price: 95, category: 'Burgers', shop: shops[1]._id, imageUrl: 'https://images.unsplash.com/photo-1513185158878-8d8c196b7f81?w=500', isAvailable: true },
      { name: 'Orange Juice', price: 40, category: 'Drinks', shop: shops[1]._id, imageUrl: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500', isAvailable: true },
      { name: 'Pepsi', price: 35, category: 'Drinks', shop: shops[1]._id, imageUrl: 'https://images.unsplash.com/photo-1543259665-cfa421675bdb?w=500', isAvailable: true },
      { name: 'Hot Wings Extra', price: 140, category: 'Burgers', shop: shops[1]._id, imageUrl: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500', isAvailable: false },

      { name: 'Philadelphia', price: 280, category: 'Sushi', shop: shops[2]._id, imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500', isAvailable: true },
      { name: 'Dragon Roll', price: 320, category: 'Sushi', shop: shops[2]._id, imageUrl: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=500', isAvailable: true },
      { name: 'Miso Soup', price: 90, category: 'Sushi', shop: shops[2]._id, imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500', isAvailable: false },
      { name: 'California Roll', price: 255, category: 'Sushi', shop: shops[2]._id, imageUrl: 'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=500', isAvailable: true },
      { name: 'Green Tea', price: 45, category: 'Drinks', shop: shops[2]._id, imageUrl: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=500', isAvailable: true },
      { name: 'Sake Hot', price: 190, category: 'Drinks', shop: shops[2]._id, imageUrl: 'https://images.unsplash.com/photo-1582106245687-cbb466a9f07f?w=500', isAvailable: true },

      { name: 'Margherita', price: 210, category: 'Pizzas', shop: shops[3]._id, imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbcd80ad00?w=500', isAvailable: true },
      { name: 'Quattro Formaggi', price: 265, category: 'Pizzas', shop: shops[3]._id, imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500', isAvailable: true },
      { name: 'Pepperoni Classico', price: 235, category: 'Pizzas', shop: shops[3]._id, imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500', isAvailable: true },
      { name: 'Hawaiian Dream', price: 220, category: 'Pizzas', shop: shops[3]._id, imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500', isAvailable: false },
      { name: 'BBQ Special', price: 270, category: 'Pizzas', shop: shops[3]._id, imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500', isAvailable: true },
      { name: 'Veggie Garden', price: 215, category: 'Pizzas', shop: shops[3]._id, imageUrl: 'https://images.unsplash.com/photo-1571066811402-9d8d0698eaa9?w=500', isAvailable: true },
      { name: 'Meat Feast', price: 295, category: 'Pizzas', shop: shops[3]._id, imageUrl: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=500', isAvailable: true },
      { name: 'Carbonara Pizza', price: 250, category: 'Pizzas', shop: shops[3]._id, imageUrl: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=500', isAvailable: true },
      { name: 'Spicy Diablo', price: 245, category: 'Pizzas', shop: shops[3]._id, imageUrl: 'https://images.unsplash.com/photo-1593504049359-7b797454f05f?w=500', isAvailable: false },
      { name: 'Calzone Meat', price: 200, category: 'Pizzas', shop: shops[3]._id, imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500', isAvailable: true },
      { name: 'Tiramisu Cake', price: 135, category: 'Desserts', shop: shops[3]._id, imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500', isAvailable: true },
      { name: 'Panna Cotta', price: 110, category: 'Desserts', shop: shops[3]._id, imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500', isAvailable: true },
      { name: 'Red Wine Glass', price: 160, category: 'Drinks', shop: shops[3]._id, imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500', isAvailable: true },
      { name: 'Sparkling Water', price: 40, category: 'Drinks', shop: shops[3]._id, imageUrl: 'https://images.unsplash.com/photo-1548964856-ac526a4861f1?w=500', isAvailable: true },

      { name: 'Fruit Platter', price: 115, category: 'Desserts', shop: shops[4]._id, imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500', isAvailable: true },
      { name: 'Berry Smoothie', price: 90, category: 'Drinks', shop: shops[4]._id, imageUrl: 'https://images.unsplash.com/photo-1553530209-b615da214594?w=500', isAvailable: true },
      { name: 'New York Cheesecake', price: 145, category: 'Desserts', shop: shops[4]._id, imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500', isAvailable: true },
      { name: 'Fresh Lemonade', price: 50, category: 'Drinks', shop: shops[4]._id, imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500', isAvailable: true },
      { name: 'Choco Mousse', price: 100, category: 'Desserts', shop: shops[4]._id, imageUrl: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=500', isAvailable: false },
      { name: 'Iced Matcha', price: 85, category: 'Drinks', shop: shops[4]._id, imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500', isAvailable: true },
    ];

    await Product.insertMany(productsData);
    console.log('✅ База успішно оновлена!');
    console.log(`🏠 Магазинів: ${shops.length}`);
    console.log(`🍕 Товарів: ${productsData.length}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Помилка:', error);
    process.exit(1);
  }
};

seedData();
