import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { Header } from "../Home/Header";
import { Features } from "../Home/Features";
import { Terms } from "../Home/Terms";
import { TermsAccept } from "../Home/TermsAccept";
import styles from "../Home/styles/Home.module.css";

const Home = () => {
  return (
    <Container maxWidth="lg" className={styles.container}>
      <Paper elevation={3} className={styles.paper}>
        <Header />
        <Features />
        <Divider className={styles.divider} />
        <Terms />
        <TermsAccept />
      </Paper>
    </Container>
  );
};

export default Home;
