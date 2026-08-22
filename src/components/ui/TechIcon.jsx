export default function TechIcon({ icon: Icon, size = 32 }) {
  if (!Icon) return null;
  return <Icon width={size} height={size} aria-hidden="true" focusable="false" />;
}
