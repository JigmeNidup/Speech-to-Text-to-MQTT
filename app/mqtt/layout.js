import { MQTTProvider } from "@/context/MQTTContext";

export default function MQTTLayout({ children }) {
  return <MQTTProvider>{children}</MQTTProvider>;
}
