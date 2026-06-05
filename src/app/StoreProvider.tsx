// /* eslint-disable react-hooks/refs */
// 'use client'
// import { useRef } from 'react'
// import { Provider } from 'react-redux'
// import { makeStore, AppStore } from '../store/store'

// export default function StoreProvider({
//   children
// }: {
//   children: React.ReactNode
// }) {
//   const storeRef = useRef<AppStore | null>(null)
//   if (!storeRef.current) {
//     // Create the store instance the first time this renders
//     storeRef.current = makeStore()
//   }

//   return <Provider store={storeRef.current}>{children}</Provider>
// }


// src/app/StoreProvider.tsx
'use client'

import { Provider } from 'react-redux'
import { makeStore } from '@/store/store'

let store: any = null

export default function StoreProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  if (!store) {
    store = makeStore()
  }

  return <Provider store={store}>{children}</Provider>
}