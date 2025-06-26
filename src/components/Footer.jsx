const Footer = () => {
  return (
    <footer className="bg-light text-center text-muted py-3 border-top shadow-sm w-100">
      <div className="container">
        <small>
          © {new Date().getFullYear()} Agristack. All rights reserved.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
