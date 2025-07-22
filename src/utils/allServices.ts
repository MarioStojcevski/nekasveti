import type { Service } from "../types";

const allServices: Service[] = [
  {
    id: "service1",
    name: "Хемиско чистење на автомобил",
    price: 4000,
    description: "Комплетно хемиско чистење на автомобилот вклучувајќи седишта, под и внатрешни површини.",
    duration: 120,
  },
  {
    id: "service2",
    name: "Чистење на теписи",
    price: 500,
    description: "Професионално чистење на теписи со специјални средства. Цената е за еден квадратен метар.",
    duration: 90,
  },
  {
    id: "service3",
    name: "Чистење на фотеља",
    price: 1000,
    description: "Хемиско чистење на мебел за да се отстранат дамки и нечистотии.",
    duration: 60,
  },
  {
    id: "service4",
    name: "Чистење на двосед",
    price: 1500,
    description: "Професионално чистење на двосед со специјални средства.",
    duration: 75,
  },
  {
    id: "service5",
    name: "Чистење на тросед",
    price: 2000,
    description: "Хемиско чистење на тросед за да се отстранат дамки и нечистотии.",
    duration: 90,
  },
  {
    id: "service6",
    name: "Чистење на спална",
    price: 800,
    description: "Хемиско чистење на вашиот лежај за да се отстранат дамки и нечистотии.",
    duration: 45,
  }
];

export default allServices;