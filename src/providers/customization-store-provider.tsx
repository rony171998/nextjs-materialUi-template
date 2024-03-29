// src/providers/customization-store-provider.tsx
'use client'

import { createContext, ReactNode, useContext, useRef } from 'react';
import { StoreApi, useStore } from 'zustand';
import { CustomizationState, CustomizationActions, createCustomizationStore } from '@/stores/customization-store';

export const CustomizationStoreContext = createContext<StoreApi<CustomizationState & CustomizationActions> | null>(null);

export interface CustomizationStoreProviderProps {
    children: ReactNode;
}

export const CustomizationStoreProvider = ({ children }: CustomizationStoreProviderProps) => {
    const storeRef = useRef<StoreApi<CustomizationState & CustomizationActions> | undefined>();
    if (!storeRef.current) {
        storeRef.current = createCustomizationStore();
    }

    return (
        <CustomizationStoreContext.Provider value={storeRef.current}>
            {children}
        </CustomizationStoreContext.Provider>
    );
};

export const useCustomizationStore = <T,>(selector: (store: CustomizationState & CustomizationActions) => T): T => {
    const customizationStoreContext = useContext(CustomizationStoreContext);

    if (!customizationStoreContext) {
        throw new Error('useCustomizationStore must be used within CustomizationStoreProvider');
    }

    return useStore(customizationStoreContext, selector);
};

