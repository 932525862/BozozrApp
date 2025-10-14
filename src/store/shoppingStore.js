// store/shoppingStore.ts
import { create } from "zustand";

export const useShoppingStore = create((set) => ({
  shoppingList: null,
  showExtraProductDialog: false,
  shoppingId: null,
  setShoppingList: (newItem) =>
    set((state) => ({
      shoppingList: [...state.shoppingList, newItem],
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
  removeShoppingItem: (id) =>
    set((state) => ({
      shoppingList: state?.shoppingList?.filter((item) => item?.id !== id),
    })),

  setShowExtraProductDialog: (show) =>
    set({ showExtraProductDialog: show }),
}));
