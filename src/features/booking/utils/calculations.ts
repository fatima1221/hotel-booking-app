import { DaySelection } from '@/store/slices/bookingSlice';
import { HOTELS, MEALS } from '../constants/data';

export const getHotelName = (hotelId: string, destinationCountry: string): string => {
  const hotels = HOTELS[destinationCountry as keyof typeof HOTELS] || [];
  return hotels.find((h) => h.id === hotelId)?.name || '';
};

export const getHotelPrice = (hotelId: string, destinationCountry: string): number => {
  const hotels = HOTELS[destinationCountry as keyof typeof HOTELS] || [];
  return hotels.find((h) => h.id === hotelId)?.price || 0;
};

export const getMealName = (
  type: 'lunch' | 'dinner',
  mealId: string,
  destinationCountry: string
): string => {
  const meals = MEALS[destinationCountry as keyof typeof MEALS]?.[type] || [];
  return meals.find((m) => m.id === mealId)?.name || '';
};

export const getMealPrice = (
  type: 'lunch' | 'dinner',
  mealId: string,
  destinationCountry: string
): number => {
  const meals = MEALS[destinationCountry as keyof typeof MEALS]?.[type] || [];
  return meals.find((m) => m.id === mealId)?.price || 0;
};

export const calculateDayTotal = (
  day: DaySelection,
  destinationCountry: string
): number => {
  let total = getHotelPrice(day.hotelId, destinationCountry);
  if (day.lunchId) total += getMealPrice('lunch', day.lunchId, destinationCountry);
  if (day.dinnerId) total += getMealPrice('dinner', day.dinnerId, destinationCountry);
  return total;
};

export const calculateGrandTotal = (
  dailySelections: DaySelection[],
  destinationCountry: string
): number => {
  return dailySelections.reduce(
    (sum, day) => sum + calculateDayTotal(day, destinationCountry),
    0
  );
};

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

