const date = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <p lang="en" className="footer__content">
        &copy; {date} Mesto Russia
      </p>
    </footer>
  );
}

export default Footer;
