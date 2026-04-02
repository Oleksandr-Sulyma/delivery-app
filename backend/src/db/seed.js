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
    console.log(
      'Поточні змінні:',
      Object.keys(process.env).filter((k) => k.includes('MONGO')),
    );
    process.exit(1);
  }

  try {
    console.log('⏳ Спроба підключення до MongoDB...');
    await mongoose.connect(uri);
    console.log('🌱 Підключено успішно. Починаємо наповнення...');

    await Shop.deleteMany({});
    await Product.deleteMany({});

    const shops = await Shop.insertMany([
      {
        name: 'Mc Donny',
        address: 'Kiev, Central St. 1',
        imageUrl: 'https://placehold.co/200x200?text=Mc+Donny',
        rating: 3.8,
      },
      {
        name: 'CFK',
        address: 'Kiev, Victory Ave. 45',
        imageUrl: 'https://placehold.co/200x200?text=CFK',
        rating: 4.2,
      },
      {
        name: 'Sushi Master',
        address: 'Kiev, River Side 12',
        imageUrl: 'https://placehold.co/200x200?text=Sushi+Master',
        rating: 2.9,
      },
      {
        name: 'Pizza Felice',
        address: 'Kiev, Italian Sq. 5',
        imageUrl:
          'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop',
        rating: 4.9,
      },
    ]);

    const products = [
      {
        name: 'Big Burger',
        price: 120,
        category: 'Burgers',
        imageUrl:
          'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
        shop: shops[0]._id,
      },
      {
        name: 'Double Cheese',
        price: 150,
        category: 'Burgers',
        imageUrl:
          'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500',
        shop: shops[0]._id,
      },
      {
        name: 'French Fries',
        price: 45,
        category: 'Burgers',
        imageUrl:
          'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500',
        shop: shops[0]._id,
      },
      {
        name: 'Apple Pie',
        price: 60,
        category: 'Desserts',
        imageUrl:
          'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=500',
        shop: shops[0]._id,
      },
      {
        name: 'Coca-Cola',
        price: 35,
        category: 'Drinks',
        imageUrl:
          'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500',
        shop: shops[0]._id,
      },

      {
        name: 'Spicy Wings',
        price: 110,
        category: 'Burgers',
        imageUrl:
          'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500',
        shop: shops[1]._id,
      },
      {
        name: 'Chicken Bucket',
        price: 350,
        category: 'Burgers',
        imageUrl:
          'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500',
        shop: shops[1]._id,
      },
      {
        name: 'Zinger Burger',
        price: 95,
        category: 'Burgers',
        imageUrl:
          'https://images.unsplash.com/photo-1513185158878-8d8c196b7f81?w=500',
        shop: shops[1]._id,
      },
      {
        name: 'Orange Juice',
        price: 40,
        category: 'Drinks',
        imageUrl:
          'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500',
        shop: shops[1]._id,
      },

      {
        name: 'Philadelphia',
        price: 280,
        category: 'Sushi',
        imageUrl:
          'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500',
        shop: shops[2]._id,
      },
      {
        name: 'Dragon Roll',
        price: 320,
        category: 'Sushi',
        imageUrl:
          'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=500',
        shop: shops[2]._id,
      },
      {
        name: 'Miso Soup',
        price: 90,
        category: 'Sushi',
        imageUrl:
          'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500',
        shop: shops[2]._id,
      },
      {
        name: 'Green Tea',
        price: 45,
        category: 'Drinks',
        imageUrl:
          'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=500',
        shop: shops[2]._id,
      },

      {
        name: 'Margherita',
        price: 210,
        category: 'Pizzas',
        imageUrl:
          'https://images.unsplash.com/photo-1574071318508-1cdbcd80ad00?w=500',
        shop: shops[3]._id,
      },
      {
        name: 'Quattro Formaggi',
        price: 260,
        category: 'Pizzas',
        imageUrl:
          'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500',
        shop: shops[3]._id,
      },
      {
        name: 'Carbonara Pizza',
        price: 245,
        category: 'Pizzas',
        imageUrl:
          'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=500',
        shop: shops[3]._id,
      },
      {
        name: 'Pepperoni Special',
        price: 230,
        category: 'Pizzas',
        imageUrl:
          'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500',
        shop: shops[3]._id,
      },
      {
        name: 'Veggie Supreme',
        price: 215,
        category: 'Pizzas',
        imageUrl:
          'https://images.unsplash.com/photo-1571066811402-9d8d0698eaa9?w=500',
        shop: shops[3]._id,
      },
      {
        name: 'Meat Lovers',
        price: 290,
        category: 'Pizzas',
        imageUrl:
          'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=500',
        shop: shops[3]._id,
      },
      {
        name: 'Hawaiian Pizza',
        price: 225,
        category: 'Pizzas',
        imageUrl:
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500',
        shop: shops[3]._id,
      },
      {
        name: 'BBQ Pizza',
        price: 255,
        category: 'Pizzas',
        imageUrl:
          'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500',
        shop: shops[3]._id,
      },
      {
        name: 'Calzone',
        price: 195,
        category: 'Pizzas',
        imageUrl:
          'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500',
        shop: shops[3]._id,
      },
      {
        name: 'Bruschetta',
        price: 95,
        category: 'Desserts',
        imageUrl:
          'https://images.unsplash.com/photo-1572656631137-7935297eff55?w=500',
        shop: shops[3]._id,
      }, // 10-й

      {
        name: 'Tiramisu',
        price: 130,
        category: 'Desserts',
        imageUrl:
          'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500',
        shop: shops[3]._id,
      }, // 11-й (2-га сторінка)
      {
        name: 'Panna Cotta',
        price: 115,
        category: 'Desserts',
        imageUrl:
          'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500',
        shop: shops[3]._id,
      },
      {
        name: 'Red Wine (Glass)',
        price: 150,
        category: 'Drinks',
        imageUrl:
          'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500',
        shop: shops[3]._id,
      },
      {
        name: 'Mineral Water',
        price: 45,
        category: 'Drinks',
        imageUrl:
          'https://images.unsplash.com/photo-1548964856-ac526a4861f1?w=500',
        shop: shops[3]._id,
      },
      {
        name: 'Espresso',
        price: 50,
        category: 'Drinks',
        imageUrl:
          'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500',
        shop: shops[3]._id,
      },
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
