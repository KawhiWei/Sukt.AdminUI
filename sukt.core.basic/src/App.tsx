import React, { Suspense, useMemo } from 'react';
import { Spin } from "antd";
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import BuildRoute from './component/buildRoute';

function App() {
  const BASE_NAME = window.__POWERED_BY_QIANKUN__ ? "/basic" : "";
  const routes = require("@/router/index").default;
  const renderLoading = useMemo(() => {
    return (
      <div className="loading">
        <Spin size="large" />
      </div>
    );
  }, [])
  return (
    <BrowserRouter basename={BASE_NAME}>
      <Suspense fallback={renderLoading}>
        <BuildRoute routes={routes} />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
