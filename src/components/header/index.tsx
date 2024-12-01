import styles from '@/src/components/header/styles.module.scss';
import Magnetic from '@/src/components/magnetic';
import { forwardRef, useRef } from 'react';

const Burger = forwardRef<HTMLDivElement, {}>(function Header(props, ref) {
  const burgerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className={styles.header}>
      <Magnetic>
        <div className={styles.burger}>
          <div ref={burgerRef} className={styles.bounds}></div>
        </div>
      </Magnetic>
    </div>
  );
});

Burger.displayName = 'Burger';

export default Burger;
