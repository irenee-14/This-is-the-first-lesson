// Button.tsx
import styles from "./Button.module.scss";

export function Button() {
  return (
    <button className={`${styles.button} ${styles.large}`}>Click me</button>
  );
}
