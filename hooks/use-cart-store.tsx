import { ProductType } from "@/app/_types/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type CartItem = {
  product: ProductType;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (product: ProductType, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
};

// const useStore = create((set) => ({}));

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (product: ProductType, quantity: number) => {
        console.log("adding item", product, quantity);
        const currItems = get().items;
        const existingItemIndex = currItems.findIndex(
          (item) => item.product.id === product.id
        );

        if (existingItemIndex !== -1) {
          const updatedItems = [...currItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + quantity,
          };
          set({ items: updatedItems });
        } else {
          set({
            items: [...currItems, { product, quantity }],
          });
        }
      },

      //   removeItem: (productId: string) => {
      //     const currItems = get().items;
      //     const updatedItems = currItems.filter(
      //       (item) => item.product.id !== productId
      //     );
      //     set({ items: updatedItems });
      //   },

      removeItem: (productId: string) => {
        const currItems = get().items;
        const existingItemIndex = currItems.findIndex(
          (item) => item.product.id === productId
        );

        if (existingItemIndex !== -1) {
          const updatedItems = [...currItems];
          const item = updatedItems[existingItemIndex];

          if (item.quantity <= 1) {
            updatedItems.splice(existingItemIndex, 1);
          } else {
            updatedItems[existingItemIndex] = {
              ...item,
              quantity: item.quantity - 1,
            };
          }

          set({ items: updatedItems });
        }
      },

      updateQuantity: (productId: string, quantity: number) => {
        const currItems = get().items;
        const itemIndex = currItems.findIndex(
          (item) => item.product.id === productId
        );

        if (itemIndex !== -1) {
          const updatedItems = [...currItems];
          updatedItems[itemIndex] = {
            ...updatedItems[itemIndex],
            quantity,
          };
          set({ items: updatedItems });
        }
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
