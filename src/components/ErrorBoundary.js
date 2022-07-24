import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2>
          There was an error.
          <Link to={"/"}>Click here</Link> or wait for 5 seconds and we will do
          it for you.
        </h2>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
