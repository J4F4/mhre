import type { ServiceIcon as ServiceIconKey } from "@/lib/services";
import {
  KeyIcon,
  TagIcon,
  CartIcon,
  BuildingIcon,
  HardHatIcon,
} from "./icons";

export function ServiceIcon({
  name,
  ...props
}: {
  name: ServiceIconKey;
  width?: number;
  height?: number;
  className?: string;
}) {
  switch (name) {
    case "key":
      return <KeyIcon {...props} />;
    case "tag":
      return <TagIcon {...props} />;
    case "cart":
      return <CartIcon {...props} />;
    case "building":
      return <BuildingIcon {...props} />;
    case "hardhat":
      return <HardHatIcon {...props} />;
    default:
      return <BuildingIcon {...props} />;
  }
}
