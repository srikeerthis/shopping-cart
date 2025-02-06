"use client";
import { useState } from "react";
import Button from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { ShoppingCart, Send } from "lucide-react";

type Item = {
  id: number;
  name: string;
  price: number;
};

const items: Item[] = [
  { id: 1, name: "Item A", price: 10 },
  { id: 2, name: "Item B", price: 15 },
  { id: 3, name: "Item C", price: 20 },
  { id: 4, name: "Item D", price: 25 },
  { id: 5, name: "Item E", price: 30 },
  { id: 6, name: "Item F", price: 35 },
];

export default function ShoppingCartApp() {
  const [cart, setCart] = useState<Item[]>([]);

  const addToCart = (item: Item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const requestItems = () => {
    alert("Request submitted for: " + cart.map((i) => i.name).join(", "));
    setCart([]);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">🛍️ Shopping Cart</h1>

      {/* Grid Layout for Items */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-2xl">
        {items.map((item) => (
          <Card key={item.id} className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg w-full h-full">
            <CardContent className="text-center">
              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-gray-600 dark:text-gray-300">${item.price}</p>
            </CardContent>
            <Button onClick={() => addToCart(item)} variant="default" className="mt-3 w-full">
              ➕ Add to Cart
            </Button>
          </Card>
        ))}
      </div>

      {/* Shopping Cart Section */}
      <h2 className="text-xl font-bold mt-8">🛒 Cart ({cart.length})</h2>
      <div className="w-full max-w-md mt-4">
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center border p-3 rounded bg-gray-50 dark:bg-gray-800">
              <p>{item.name} - ${item.price}</p>
              <Button onClick={() => removeFromCart(index)} variant="destructive">
                ❌ Remove
              </Button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-2">Your cart is empty.</p>
        )}
      </div>

      {/* Request Items Button */}
      <Button onClick={requestItems} className="mt-6 px-6 py-3 text-lg" variant="default" disabled={cart.length === 0}>
  <Send className="mr-2" /> Request Items
</Button>
    </div>
  );
}
