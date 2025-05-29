"use client";

import React, { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundaryComponent extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("🚨 Caught by ErrorBoundary:", error, errorInfo);
  }

  handleReload = () => {
    // Optional: reset error state before reload
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
      return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-50 px-4">
          <h1 className="text-3xl font-bold text-red-600 mb-4">حدث خطأ غير متوقع</h1>
          <p className="text-gray-600 text-sm mb-6">
            نأسف على الإزعاج! يبدو أن هناك مشكلة في تحميل الصفحة.
            <br />
            {this.state.error?.message && (
              <span className="block mt-2 text-red-400 text-xs italic">
                ({this.state.error.message})
              </span>
            )}
          </p>
          <button
            onClick={this.handleReload}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            إعادة تحميل الصفحة
          </button>
        </div>
      );
    }

  
}

export default ErrorBoundaryComponent;
