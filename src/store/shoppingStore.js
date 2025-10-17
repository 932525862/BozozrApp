import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useShoppingStore = create(
  persist(
    (set, get) => ({
      shoppingList: [],
      showExtraProductDialog: false,
      shoppingId: null,
      brendId: null,

      setShoppingList: (newItem) =>
        set((state) => ({
          shoppingList: [...(state.shoppingList || []), newItem],
        })),

      updateShoppingItemName: (id, newName) =>
        set((state) => ({
          shoppingList: state.shoppingList.map((item) =>
            item.id === id ? { ...item, name: newName } : item
          ),
        })),

      setShoppingListAll: (newItemAll) =>
        set(() => ({
          shoppingList: newItemAll,
        })),

      setShoppingId: (id) =>
        set(() => ({
          shoppingId: id,
        })),

      setBrendId: (id) =>
        set(() => ({
          brendId: id,
        })),

      removeShoppingItem: (id) =>
        set((state) => ({
          shoppingList: state.shoppingList.filter((item) => item.id !== id),
        })),

      setShowExtraProductDialog: (show) =>
        set({ showExtraProductDialog: show }),
    }),
    {
      name: "shopping-storage", // localStorage kaliti nomi
      partialize: (state) => ({
        brendId: state.brendId, // faqat kerakli narsani saqlaymiz
      }),
    }
  )
);
