const NotFound = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center min-vh-100 bg-light px-3">
      <img
        src="https://www.shutterstock.com/image-vector/page-not-found-error-404-260nw-479042983.jpg"
        alt="Not Found"
        className="mb-4 img-fluid"
        style={{ maxWidth: "600px" }}
      />
      <h1 className="display-5 text-danger mb-3">Oops! Page Not Found</h1>
      <p className="text-muted mb-4">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a href="/" className="btn btn-success">
        Go to Homepage
      </a>
    </div>
  );
};

export default NotFound;
