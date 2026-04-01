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
    console.error('❌ Помилка: MONGODB_URI не знайдено в process.env!');
    console.log('Поточні змінні:', Object.keys(process.env).filter(k => k.includes('MONGO')));
    process.exit(1);
  }

  try {
    console.log('⏳ Спроба підключення до MongoDB...');
    await mongoose.connect(uri);
    console.log('🌱 Підключено успішно. Починаємо наповнення...');

    await Shop.deleteMany({});
    await Product.deleteMany({});

    const shops = await Shop.insertMany([
      { name: 'Mc Donny', address: 'Kiev, Central St. 1', imageUrl: 'https://placehold.co/200x200?text=Mc+Donny', rating: 4.8 },
      { name: 'CFK', address: 'Kiev, Victory Ave. 45', imageUrl: 'https://placehold.co/200x200?text=CFK', rating: 4.2 },
      { name: 'Sushi Master', address: 'Kiev, River Side 12', imageUrl: 'https://placehold.co/200x200?text=Sushi+Master', rating: 4.5 }
    ]);

    const products = [
  { name: 'Big Burger', price: 120, category: 'Burgers', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500', shop: shops[0]._id },
  { name: 'Double Cheese', price: 150, category: 'Burgers', imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500', shop: shops[0]._id },
  { name: 'French Fries', price: 45, category: 'Burgers', imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500', shop: shops[0]._id },
  { name: 'Apple Pie', price: 60, category: 'Desserts', imageUrl: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=500', shop: shops[0]._id },
  { name: 'Coca-Cola', price: 35, category: 'Drinks', imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500', shop: shops[0]._id },

  { name: 'Spicy Wings', price: 110, category: 'Burgers', imageUrl: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500', shop: shops[1]._id },
  { name: 'Chicken Bucket', price: 350, category: 'Burgers', imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500', shop: shops[1]._id },
  { name: 'Zinger Burger', price: 95, category: 'Burgers', imageUrl: 'https://images.unsplash.com/photo-1513185158878-8d8c196b7f81?w=500', shop: shops[1]._id },
  { name: 'Orange Juice', price: 40, category: 'Drinks', imageUrl: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500', shop: shops[1]._id },

  { name: 'Philadelphia', price: 280, category: 'Sushi', imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500', shop: shops[2]._id },
  { name: 'Dragon Roll', price: 320, category: 'Sushi', imageUrl: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=500', shop: shops[2]._id },
  { name: 'Miso Soup', price: 90, category: 'Sushi', imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500', shop: shops[2]._id },
  { name: 'Green Tea', price: 45, category: 'Drinks', imageUrl: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=500', shop: shops[2]._id }
];

    await Product.insertMany(products);
    console.log('✅ База успішно наповнена!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Помилка під час сідингу:', error);
    process.exit(1);
  }
};

seedData();
