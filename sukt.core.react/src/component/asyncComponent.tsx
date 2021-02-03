import React from "react";

export const asyncComponent = (loadComponent: () => Promise<any>) => (
  class AsyncComponent extends React.Component {
    constructor(props: any) {
      super(props);
      this.state = {
        Component: null
      }
    }

    componentWillMount() {
      if (this.hasLoadedComponent()) {
        return
      }

      loadComponent()
        .then(module => module.default)
        .then((Component) => {
          this.setState({ Component })
        })
        .catch((err) => {
          console.error(`Cannot load component in <AsyncComponent />`);
          throw err
        })
    }

    hasLoadedComponent() {
      return (this.state as any).Component !== null
    }

    render() {
      const { Component } :any= this.state;
      return (Component) ? <Component {...this.props} /> : null
    }
  }
)