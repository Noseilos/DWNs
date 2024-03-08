import styles from "./styles/Footer.module.css"
function Footer() {
  return (
    <footer className={`${styles.footer} text-center py-3`}>
    <p className={styles.copyright}>
      &copy; Copyright {new Date().getFullYear()} by DWN
      Inc.
    </p>
  </footer>
  
  )
}

export default Footer