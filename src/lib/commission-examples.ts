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
  { id: "spirit", group: "tokens", image: "/commissions/token-spirit.jpg", width: 989, height: 1400 },
  { id: "bird", group: "tokens", image: "/commissions/token-bird.jpg", width: 1017, height: 1400 },
  { id: "riverglide", group: "alters", image: "/commissions/alter-riverglide-pathway.jpg", width: 981, height: 1400 },
  { id: "volcanic", group: "alters", image: "/commissions/alter-volcanic-island.jpg", width: 1013, height: 1400 },
  { id: "cavern", group: "alters", image: "/commissions/alter-cavern-of-souls.jpg", width: 964, height: 1400 },
  { id: "badgermole", group: "alters", image: "/commissions/alter-badgermole-cub.jpg", width: 936, height: 1400 },
  { id: "lionseye", group: "alters", image: "/commissions/alter-lions-eye-diamond.jpg", width: 981, height: 1400 },
  { id: "command", group: "alters", image: "/commissions/alter-command-tower.jpg", width: 931, height: 1400 },
  { id: "otter", group: "alters", image: "/commissions/alter-otter-penguin.jpg", width: 1044, height: 1400 },
  { id: "aegis", group: "alters", image: "/commissions/alter-aegis-turtle.jpg", width: 1032, height: 1400 },
];
