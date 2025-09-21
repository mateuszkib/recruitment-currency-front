import { Component } from "react";
import { routes } from "./constants/routes";
import { Container } from "@mui/material";
import { NotFound } from "../NotFound";

interface RouterState {
  currentPath: string;
}

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
          <Component />
        </Container>
      );
    }

    return <NotFound />;
  }
}

export default Router;
