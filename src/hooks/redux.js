// src/hooks/redux.js
import { useDispatch, useSelector } from "react-redux";

// Typed hooks per migliore TypeScript support (funziona anche con JS)
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
