'use client';

import React, { useMemo } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '../store/store';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = useMemo<AppStore>(() => makeStore(), []);

  return React.createElement(Provider, {
    store: store,
    children: children,
  });
}
