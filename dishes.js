// dishes.js
const dishes = [
    //SOUP
    {
        keyword: 'gaspacho',
        name: 'Гаспачо',
        price: 195,
        category: 'soup',
        count: '350 г',
        image: '../soup1.jpg',
        kind: 'veg'
    },
    {
        keyword: 'abrikos',
        name: 'абрикос',
        price: 222,
        category: 'soup',
        count: '350 г',
        image: '../soup1.jpg',
        kind: 'veg'
    },
    {
        keyword: 'tom_yam',
        name: 'Том Ям',
        price: 300,
        category: 'soup',
        count: '500 мл',
        image: '../soup1.jpg',
        kind: 'meat'
    },
    {
        keyword: "borsch",
        name: "Борщ",
        price: 250,
        category: "soup",
        count: "400 мл",
        image: "../soup2.jpg",
        kind: "meat"
    },
    {
        keyword: "salmon_soup",
        name: "Суп с лососем",
        price: 320,
        category: "soup",
        count: "450 мл",
        image: "../soup3.jpg",
        kind: "fish"
    },
    {
        keyword: "fish_soup",
        name: "Уха",
        price: 270,
        category: "soup",
        count: "500 мл",
        image: "../soup4.jpg",
        kind: "fish"
    },
    //MAIN
    {
        keyword: "lasagna",
        name: "Лазанья",
        price: 385,
        category: "main",
        count: "400 г",
        image: "../main1.jpg",
        kind: "veg"
    },
    {
        keyword: "veggie_pasta",
        name: "Овощная паста",
        price: 360,
        category: "main",
        count: "350 г",
        image: "../main2.jpg",
        kind: "veg"
    },
    {
        keyword: "steak",
        name: "Стейк",
        price: 550,
        category: "main",
        count: "300 г",
        image: "../main3.jpg",
        kind: "meat"
    },
    {
        keyword: "beef_burger",
        name: "Бургер с говядиной",
        price: 420,
        category: "main",
        count: "250 г",
        image: "../main4.jpg",
        kind: "meat"
    },
    {
        keyword: "salmon_steak",
        name: "Стейк из лосося",
        price: 490,
        category: "main",
        count: "300 г",
        image: "../main5.jpg",
        kind: "fish"
    },
    {
        keyword: "tuna_pasta",
        name: "Паста с тунцом",
        price: 410,
        category: "main",
        count: "350 г",
        image: "../main6.jpg",
        kind: "fish"
    },    
   //Drinks
    {
        keyword: 'compote',
        name: 'Компот',
        price: 150,
        category: 'drink',
        count: '250 мл',
        image: '../drink1.jpg',
        kind: 'cold'
    },
    {
        keyword: 'fanta',
        name: 'Фанта',
        price: 150,
        category: 'drink',
        count: '250 мл',
        image: '../drink2.jpg',
        kind: 'cold'
    },
    {
        keyword: 'coca-cola',
        name: 'Кока-Кола',
        price: 160,
        category: 'drink',
        count: '330 мл',
        image: '../drink3.jpg',
        kind: 'cold'
    },
    {
        keyword: 'americano',
        name: 'Американо',
        price: 180,
        category: 'drink',
        count: '200 мл',
        image: '../drink4.jpg',
        kind: 'hot'
    },
    {
        keyword: 'latte',
        name: 'Латте',
        price: 220,
        category: 'drink',
        count: '300 мл',
        image: '../drink5.jpg',
        kind: 'hot'
    },
    {
        keyword: 'tea',
        name: 'Чай',
        price: 100,
        category: 'drink',
        count: '250 мл',
        image: '../drink6.jpg',
        kind: 'hot'
    },
    //SALAT
    {
        keyword: 'caesar_salad',
        name: 'Салат Цезарь с курицей',
        price: 350,
        category: 'salad-starter',
        count: '200 г',
        image: '../salad1.jpg',
        kind: 'meat'
    },
    {
        keyword: 'beef_tartare',
        name: 'Тартар из говядины',
        price: 500,
        category: 'salad-starter',
        count: '150 г',
        image: './starter1.jpg',
        kind: 'meat'
    },
    {
        keyword: 'greek_salad',
        name: 'Греческий салат',
        price: 300,
        category: 'salad-starter',
        count: '250 г',
        image: '../salad2.jpg',
        kind: 'veg'
    },
    {
        keyword: 'bruschetta',
        name: 'Брускетта с томатами',
        price: 200,
        category: 'salad-starter',
        count: '120 г',
        image: '../starter2.jpg',
        kind: 'veg'
    },
    {
        keyword: 'salmon_tartare',
        name: 'Тартар из лосося',
        price: 550,
        category: 'salad-starter',
        count: '180 г',
        image: '../salad3.jpg',
        kind: 'fish'
    },
    {
        keyword: 'shrimp_cocktail',
        name: 'Коктейль из креветок',
        price: 450,
        category: 'salad-starter',
        count: '150 г',
        image: '../starter3.jpg',
        kind: 'fish'
    },
    //DESERT
    {
        keyword: 'chocolate_truffle',
        name: 'Шоколадный трюфель',
        price: 120,
        category: 'dessert',
        count: '50 г',
        image: '../dessert1.jpg',
        kind: 'small'
    },
    {
        keyword: 'mini_cheesecake',
        name: 'Мини-чизкейк',
        price: 150,
        category: 'dessert',
        count: '80 г',
        image: '../dessert2.jpg',
        kind: 'small'
    },
    {
        keyword: 'brownie',
        name: 'Брауни',
        price: 200,
        category: 'dessert',
        count: '120 г',
        image: '../dessert3.jpg',
        kind: 'medium'
    },
    {
        keyword: 'apple_pie_slice',
        name: 'Кусочек яблочного пирога',
        price: 180,
        category: 'dessert',
        count: '150 г',
        image: '../dessert4.jpg',
        kind: 'medium'
    },
    {
        keyword: 'tiramisu',
        name: 'Тирамису',
        price: 300,
        category: 'dessert',
        count: '200 г',
        image: '../dessert5.jpg',
        kind: 'large'
    },
    {
        keyword: 'fruit_platter',
        name: 'Фруктовая тарелка',
        price: 350,
        category: 'dessert',
        count: '250 г',
        image: '../dessert6.jpg',
        kind: 'large'
    }
    
];

// Export the array to make it available for import
export { dishes };
