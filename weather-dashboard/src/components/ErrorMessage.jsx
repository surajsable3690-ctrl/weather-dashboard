function ErrorMessage({ message }) {
  return (
    <div className="error-box">
      <p>⚠ {message}</p>
      <p className="error-sub">Try searching for a different city.</p>
    </div>
  );
}

export default ErrorMessage;