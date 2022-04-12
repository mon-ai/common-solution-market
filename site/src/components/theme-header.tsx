import styles from './theme-header.less';

export function ThemeHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.header_1} style={{ background: 'white' }}>
        <h1 className={styles.title}>
          <span className={styles.colored}>.co</span>
          <br />
          &nbsp;&nbsp;&nbsp;mmonAI
        </h1>
        <h1 className={styles.title}>.common</h1>
      </div>
      <div className={styles.header_2}>
        <h1 className={styles.title}>
          solution market
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <em style={{ color: 'white' }}>proposals</em>
        </h1>
      </div>
    </div>
  );
}
