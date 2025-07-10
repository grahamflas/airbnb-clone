"use client";

import { ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}

const ClientOnly = ({ children }: Props) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    console.log("ClientOnly has mounted");
    setHasMounted(true);
    return () => console.log("ClientOnly has unmounted");
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};

export default ClientOnly;
