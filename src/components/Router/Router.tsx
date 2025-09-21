import { Component, Suspense } from "react";
import { routes } from "./constants/routes";
import { Container } from "@mui/material";
import { NotFound } from "../NotFound";
import { LoadingFallback } from "../LoadingFallback";
import type { RouterState } from "../../interfaces/RouterState";

class Router extends Component<{}, RouterState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      currentPath: window.location.pathname,
    };
  }

  componentDidMount() {
    window.addEventListener("navigate", this.handleNavigation as EventListener);
    window.addEventListener("popstate", this.handleNavigation as EventListener);
  }

  componentWillUnmount() {
    window.removeEventListener(
      "navigate",
      this.handleNavigation as EventListener
    );
    window.removeEventListener(
      "popstate",
      this.handleNavigation as EventListener
    );
  }

  handleNavigation = (event: Event) => {
    let newPath: string;

    if (event.type === "navigate" && (event as CustomEvent).detail?.path) {
      newPath = (event as CustomEvent).detail.path;
      window.history.pushState({}, "", newPath);
    } else {
      newPath = window.location.pathname;
    }

    this.setState({ currentPath: newPath });
  };

  render() {
    const { currentPath } = this.state;

    const route = routes.find((r) => r.path === currentPath);

    if (route) {
      const Component = route.component;

      return (
        <Container maxWidth="lg">
          <Suspense fallback={<LoadingFallback />}>
            <Component />
          </Suspense>
        </Container>
      );
    }

    return <NotFound />;
  }
}

export default Router;
