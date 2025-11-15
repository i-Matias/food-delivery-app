import arrowDown from "@/assets/icons/arrow-down.png";
import arrowRight from "@/assets/icons/arrow-right.png";
import bag from "@/assets/icons/bag.png";
import check from "@/assets/icons/check.png";
import clock from "@/assets/icons/clock.png";
import dollar from "@/assets/icons/dollar.png";
import envelope from "@/assets/icons/envelope.png";
import home from "@/assets/icons/home.png";
import location from "@/assets/icons/location.png";
import logout from "@/assets/icons/logout.png";
import minus from "@/assets/icons/minus.png";
import pencil from "@/assets/icons/pencil.png";
import person from "@/assets/icons/person.png";
import phone from "@/assets/icons/phone.png";
import plus from "@/assets/icons/plus.png";
import search from "@/assets/icons/search.png";
import star from "@/assets/icons/star.png";
import trash from "@/assets/icons/trash.png";
import user from "@/assets/icons/user.png";
import arrowBack from "../assets/icons/arrow-back.png";
import cartWhite from "../assets/icons/cart-white.png";
import cart from "../assets/icons/cart.png";

import avatar from "@/assets/images/avatar.png";
import avocado from "@/assets/images/avocado.png";
import bacon from "@/assets/images/bacon.png";
import burgerOne from "@/assets/images/burger-one.png";
import burgerTwo from "@/assets/images/burger-two.png";
import buritto from "@/assets/images/buritto.png";
import cheese from "@/assets/images/cheese.png";
import coleslaw from "@/assets/images/coleslaw.png";
import cucumber from "@/assets/images/cucumber.png";
import emptyState from "@/assets/images/empty-state.png";
import fries from "@/assets/images/fries.png";
import loginGraphic from "@/assets/images/login-graphic.png";
import logo from "@/assets/images/logo.png";
import mozarellaSticks from "@/assets/images/mozarella-sticks.png";
import mushrooms from "@/assets/images/mushrooms.png";
import onionRings from "@/assets/images/onion-rings.png";
import onions from "@/assets/images/onions.png";
import pizzaOne from "@/assets/images/pizza-one.png";
import salad from "@/assets/images/salad.png";
import signInLogo from "@/assets/images/sign-up-logo.png";
import success from "@/assets/images/success.png";
import tomatoes from "@/assets/images/tomatoes.png";

export const CATEGORIES = [
  {
    id: "1",
    name: "All",
  },
  {
    id: "2",
    name: "Burger",
  },
  {
    id: "3",
    name: "Pizza",
  },
  {
    id: "4",
    name: "Wrap",
  },
  {
    id: "5",
    name: "Burrito",
  },
];

export const offers = [
  {
    id: 1,
    title: "SUMMER COMBO",
    image: burgerOne,
    color: "#D33B0D",
  },
  {
    id: 2,
    title: "BURGER BASH",
    image: burgerTwo,
    color: "#DF5A0C",
  },
  {
    id: 3,
    title: "PIZZA PARTY",
    image: pizzaOne,
    color: "#084137",
  },
  {
    id: 4,
    title: "BURRITO DELIGHT",
    image: buritto,
    color: "#EB920C",
  },
];

export const sides = [
  {
    name: "Fries",
    image: fries,
    price: 3.5,
  },
  {
    name: "Onion Rings",
    image: onionRings,
    price: 4.0,
  },
  {
    name: "Mozarella Sticks",
    image: mozarellaSticks,
    price: 5.0,
  },
  {
    name: "Coleslaw",
    image: coleslaw,
    price: 2.5,
  },
  {
    name: "Salad",
    image: salad,
    price: 4.5,
  },
];

export const toppings = [
  {
    name: "Avocado",
    image: avocado,
    price: 1.5,
  },
  {
    name: "Bacon",
    image: bacon,
    price: 2.0,
  },
  {
    name: "Cheese",
    image: cheese,
    price: 1.0,
  },
  {
    name: "Cucumber",
    image: cucumber,
    price: 0.5,
  },
  {
    name: "Mushrooms",
    image: mushrooms,
    price: 1.2,
  },
  {
    name: "Onions",
    image: onions,
    price: 0.5,
  },
  {
    name: "Tomatoes",
    image: tomatoes,
    price: 0.7,
  },
];

export const images = {
  avatar,
  avocado,
  bacon,
  burgerOne,
  burgerTwo,
  buritto,
  cheese,
  coleslaw,
  cucumber,
  emptyState,
  fries,
  loginGraphic,
  logo,
  mozarellaSticks,
  mushrooms,
  onionRings,
  onions,
  pizzaOne,
  salad,
  success,
  tomatoes,
  arrowBack,
  arrowDown,
  arrowRight,
  cart,
  cartWhite,
  bag,
  check,
  clock,
  dollar,
  envelope,
  home,
  location,
  logout,
  minus,
  pencil,
  person,
  phone,
  plus,
  search,
  star,
  trash,
  user,
  signInLogo,
};

export type ImageValue = (typeof images)[keyof typeof images];

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: any;
  category: string;
  rating: number;
  preparationTime: string;
  sizes?: Array<{ name: string; price: number }>;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: any;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  categories: string[];
  menuItems: MenuItem[];
}

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Burger Palace",
    description: "Best burgers in town with premium ingredients",
    image: burgerOne,
    rating: 4.8,
    deliveryTime: "20-30 min",
    deliveryFee: 2.99,
    categories: ["Burger", "Fast Food"],
    menuItems: [
      {
        id: "1-1",
        name: "Classic Beef Burger",
        description:
          "Juicy beef patty with lettuce, tomato, onion, and our special sauce",
        price: 8.99,
        image: burgerOne,
        category: "Burger",
        rating: 4.7,
        preparationTime: "15-20 min",
        sizes: [
          { name: "Regular", price: 0 },
          { name: "Large", price: 2.0 },
        ],
      },
      {
        id: "1-2",
        name: "Double Cheese Burger",
        description: "Two beef patties loaded with cheese and pickles",
        price: 11.99,
        image: burgerTwo,
        category: "Burger",
        rating: 4.9,
        preparationTime: "15-20 min",
        sizes: [
          { name: "Regular", price: 0 },
          { name: "Large", price: 2.5 },
        ],
      },
      {
        id: "1-3",
        name: "Veggie Burger",
        description: "Plant-based patty with fresh vegetables and hummus",
        price: 9.99,
        image: burgerOne,
        category: "Burger",
        rating: 4.5,
        preparationTime: "15-20 min",
      },
    ],
  },
  {
    id: "2",
    name: "Pizza Paradise",
    description: "Authentic Italian pizza with fresh ingredients",
    image: pizzaOne,
    rating: 4.6,
    deliveryTime: "30-40 min",
    deliveryFee: 3.99,
    categories: ["Pizza", "Italian"],
    menuItems: [
      {
        id: "2-1",
        name: "Margherita Pizza",
        description: "Classic pizza with tomato sauce, mozzarella, and basil",
        price: 12.99,
        image: pizzaOne,
        category: "Pizza",
        rating: 4.7,
        preparationTime: "25-30 min",
        sizes: [
          { name: "Small", price: 0 },
          { name: "Medium", price: 3.0 },
          { name: "Large", price: 6.0 },
        ],
      },
      {
        id: "2-2",
        name: "Pepperoni Pizza",
        description: "Loaded with pepperoni and extra cheese",
        price: 14.99,
        image: pizzaOne,
        category: "Pizza",
        rating: 4.8,
        preparationTime: "25-30 min",
        sizes: [
          { name: "Small", price: 0 },
          { name: "Medium", price: 3.0 },
          { name: "Large", price: 6.0 },
        ],
      },
      {
        id: "2-3",
        name: "Veggie Supreme",
        description: "Fresh vegetables with olives and mushrooms",
        price: 13.99,
        image: pizzaOne,
        category: "Pizza",
        rating: 4.6,
        preparationTime: "25-30 min",
        sizes: [
          { name: "Small", price: 0 },
          { name: "Medium", price: 3.0 },
          { name: "Large", price: 6.0 },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Burrito Bar",
    description: "Fresh Mexican-style burritos made to order",
    image: buritto,
    rating: 4.7,
    deliveryTime: "25-35 min",
    deliveryFee: 2.49,
    categories: ["Burrito", "Mexican"],
    menuItems: [
      {
        id: "3-1",
        name: "Chicken Burrito",
        description: "Grilled chicken with rice, beans, and fresh salsa",
        price: 10.99,
        image: buritto,
        category: "Burrito",
        rating: 4.8,
        preparationTime: "20-25 min",
      },
      {
        id: "3-2",
        name: "Beef Burrito",
        description: "Seasoned beef with guacamole and sour cream",
        price: 11.99,
        image: buritto,
        category: "Burrito",
        rating: 4.7,
        preparationTime: "20-25 min",
      },
      {
        id: "3-3",
        name: "Veggie Burrito",
        description: "Black beans, rice, grilled vegetables, and cheese",
        price: 9.99,
        image: buritto,
        category: "Burrito",
        rating: 4.6,
        preparationTime: "20-25 min",
      },
    ],
  },
  {
    id: "4",
    name: "Wrap World",
    description: "Healthy wraps with premium ingredients",
    image: burgerTwo,
    rating: 4.5,
    deliveryTime: "15-25 min",
    deliveryFee: 1.99,
    categories: ["Wrap", "Healthy"],
    menuItems: [
      {
        id: "4-1",
        name: "Grilled Chicken Wrap",
        description: "Tender chicken with crispy lettuce and ranch dressing",
        price: 8.99,
        image: burgerTwo,
        category: "Wrap",
        rating: 4.6,
        preparationTime: "15-20 min",
      },
      {
        id: "4-2",
        name: "Caesar Wrap",
        description: "Classic Caesar salad wrapped in a soft tortilla",
        price: 7.99,
        image: burgerTwo,
        category: "Wrap",
        rating: 4.5,
        preparationTime: "15-20 min",
      },
      {
        id: "4-3",
        name: "Falafel Wrap",
        description: "Crispy falafel with hummus and fresh vegetables",
        price: 8.49,
        image: burgerTwo,
        category: "Wrap",
        rating: 4.7,
        preparationTime: "15-20 min",
      },
    ],
  },
];
