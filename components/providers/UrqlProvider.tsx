"use client";

import { Provider } from "urql";
import type { ReactNode } from "react";
import { urqlClient } from "@/lib/graphql/urqlClient";

interface UrqlProviderProps {
  children: ReactNode;
}

const UrqlProvider = ({ children }: UrqlProviderProps) => {
  return <Provider value={urqlClient}>{children}</Provider>;
};

export default UrqlProvider;
