import foodDictionary from "./foodDictionary";

export const extractFoodsTried = (entries: { food: string }[]): string[] => {
  const foodSet = new Set<string>();

  for (const entry of entries) {
    const description = entry.food.toLowerCase();

    for (const item of foodDictionary) {
      if (description.includes(item)) {
        foodSet.add(item);
      }
    }
  }

  return Array.from(foodSet).sort();
}
