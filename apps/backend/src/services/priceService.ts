import { pricing } from "../models/priceModel";

export const priceCalculation = (data: any) => {
  if (!data.rooms || !Array.isArray(data.rooms)) {
    throw new Error("Invalid input: rooms array is required");
  }

  const totalPrice = { min: 0, max: 0 };

  const roomPrices = data.rooms.map((room: any) => {
    const floorPrice = calculateFloorPrice(room);

    const roomTotalPrice = {
      min: floorPrice.min,
      max: floorPrice.max,
    };

    totalPrice.min += roomTotalPrice.min;
    totalPrice.max += roomTotalPrice.max;

    return {
      room: room.label,
      floorPrice,
    };
  });
  console.log(`Room prices: ${roomPrices}, Total prices: ${totalPrice}`);
  return { roomPrices, totalPrice };
};

export const calculateFloorPrice = (room: any) => {
  const selectedSize = room.roomSizes.find((size: any) => size.isSelected);
  const selectedFloor = room.floors.find((floor: any) => floor.isSelected);

  if (!selectedSize || !selectedFloor) {
    return { min: 0, max: 0 };
  }

  const sizeRange = pricing.size.find((size: any) => size.label === selectedSize.label);
  console.log("selected sizeRange", sizeRange);
  const floorPricePerM2 =
    pricing.floor.find((floor: any) => floor.label === selectedFloor.label)?.pricePerM2 || 0;

  if (!sizeRange) {
    return { min: 0, max: 0 };
  }

  return {
    min: sizeRange.min + floorPricePerM2,
    max: sizeRange.max + floorPricePerM2,
  };
};
