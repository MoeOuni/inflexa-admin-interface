import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FileFromApi } from './interfaces';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { v4 as uuidv4 } from 'uuid';

export const parseFilePath = (filePath: string): FileFromApi => {
  // Split the file path into parts
  const parts = filePath.split('/');
  const fileNameWithExt = parts[parts.length - 1];

  // Extract the base directory (same as the file path)
  const baseDir = filePath;

  // Extract the file name and extension
  const [fileNameWithoutExt, fileExtension] = fileNameWithExt.split('.');

  // Extract the original name (file name before unique ID, without extension)
  const originalName =
    fileNameWithoutExt.split('-').slice(0, -1).join('-') + `.${fileExtension}`;

  return {
    baseDir,
    fileExtension,
    fileName: fileNameWithExt, // Keep the extension with the file name
    originalName,
  };
};

type CalObject = {
  price: number;
  quantity: number;
  tax: number;
};

export function calculateTotalWithoutTax(items?: CalObject[]) {
  return items?.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

export function calculateTotalTax(items?: CalObject[]) {
  return items?.reduce((total, item) => {
    return total + item.price * item.quantity * (item.tax / 100);
  }, 0);
}

export function calculateTotalPrice(items?: CalObject[]) {
  return items?.reduce((total, item) => {
    return total + item.price * item.quantity * (1 + item.tax / 100);
  }, 0);
}

// Utility function to generate unique IDs (optional but recommended)
export const generateId = (startsWith?: string) => `${startsWith}${uuidv4()}`;
