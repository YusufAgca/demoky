import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./index";

/**
 * Tipli Redux Hook'ları (Typed Redux Hooks)
 * 
 * Standart useDispatch ve useSelector yerine bu hook'ların kullanılması,
 * bileşenler genelinde tam tip güvenliği ve otomatik tamamlama (IntelliSense) sağlar.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
