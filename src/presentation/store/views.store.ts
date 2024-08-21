
import { create } from "zustand";

interface View {
    id: string;
    title: string;
}

interface ViewsStore {
    selectedView: View | null;
    views: View[];
    addView: (view: View) => void;
    removeView: (view: View) => void;
    setViews: (views: View[]) => void;
    setView: (view: View) => void;
}

export const useViewStore = create<ViewsStore>((set) => ({
    selectedView: null,
    views: [],
    addView: (view) => set((state) => ({ views: [...state.views, view] })),
    removeView: (view) =>
        set((state) => ({
        views: state.views.filter((v) => v.id !== view.id),
        })),
    setViews: (views) => set({ views }),
    setView: (view) => set({ selectedView: view }),
}))