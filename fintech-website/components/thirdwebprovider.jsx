"use client";

import React from 'react'
import { ThirdwebProvider } from "thirdweb/react";

export default function ThirdWeb({ children}) {
  return <ThirdwebProvider>{children}</ThirdwebProvider>
}

