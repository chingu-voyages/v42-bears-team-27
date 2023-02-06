import React from 'react';

import ErrorFallback from './ErrorFallback';

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  // componentDidCatch(error: Error, info: any) {
  //   // Optional: can use error logging/reporting service here
  //   console.log({ error, info });
  // }

  render() {
    const errorHandler = () => {
      this.setState({ hasError: false, error: null });
    };

    if (this.state.hasError) {
      return (
        <ErrorFallback
          message={(this.state.error as Error).message}
          errorCallback={errorHandler}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
