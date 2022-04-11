import styles from './theme_header.less';

export interface IThemeHeader {
  c1: any;
  c1_bg: any;
}

export function ThemeHeader(props: IThemeHeader) {
  return (
    <div className={styles.header}>
      <div className={styles.header_1} style={{ background: 'white' }}>
        <h1 className={styles.title}>
          <span style={props.c1}>.co</span>
          <br />
          &nbsp;&nbsp;&nbsp;mmonAI
        </h1>
        <h1 className={styles.title}>.common</h1>
      </div>
      <div className={styles.header_2} style={props.c1_bg}>
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
