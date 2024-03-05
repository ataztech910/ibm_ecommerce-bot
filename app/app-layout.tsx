'use client';
import { WebAppDataContext } from '@/utils/web-app-provider';
import { NextUIProvider } from '@nextui-org/react';
import { useContext, useEffect, useState } from 'react';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const { state } = useContext(WebAppDataContext);
    return (
          <body>
            <NextUIProvider>
              { state.appData?.version?.length > 0 && 
                  children
              }
            </NextUIProvider>
          </body>
      
    )
}
