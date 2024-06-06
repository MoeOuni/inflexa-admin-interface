import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type CalObject = {
  price: number;
  quantity: number;
  tax: number;
}

export function calculateTotalWithoutTax(items?: CalObject[]) {
  return items?.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
}

export function calculateTotalTax(items?: CalObject[]) {
  return items?.reduce((total, item) => {
    return total + (item.price * item.quantity * (item.tax / 100));
  }, 0);
}

export function calculateTotalPrice(items?: CalObject[]) {
  return items?.reduce((total, item) => {
    return total + (item.price * item.quantity * (1 + item.tax / 100));
  }, 0);
}

