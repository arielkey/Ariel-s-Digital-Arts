export interface CommissionExample {
  id: string;
  group: "tokens" | "alters";
  image: string;
  width: number;
  height: number;
}

export const commissionExamples: CommissionExample[] = [
  { id: "fish", group: "tokens", image: "/commissions/token-fish.jpg", width: 1027, height: 1400 },
  { id: "food", group: "tokens", image: "/commissions/token-food.jpg", width: 998, height: 1400 },
  { id: "treasure", group: "tokens", image: "/commissions/token-treasure.jpg", width: 1016, height: 1400 },
  { id: "hourglass", group: "tokens", image: "/commissions/token-hourglass.jpg", width: 985, height: 1400 },
  { id: "volcanic", group: "alters", image: "/commissions/alter-volcanic-island.jpg", width: 1013, height: 1400 },
  { id: "cavern", group: "alters", image: "/commissions/alter-cavern-of-souls.jpg", width: 964, height: 1400 },
  { id: "badgermole", group: "alters", image: "/commissions/alter-badgermole-cub.jpg", width: 936, height: 1400 },
  { id: "tayam", group: "alters", image: "/commissions/alter-tayam-luminous-enigma.jpg", width: 1003, height: 1400 },
];
