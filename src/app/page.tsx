// "use client";

// import Image from "next/image";
// import { useDispatch } from 'react-redux';
// import { increment, decrement, reset } from '../features/countSlice/countSlice';
// import { Button } from "@/components/ui/button";

// export default function Home() {
//   const dispatch = useDispatch();
  
//   return (
//     <div>
//       <Button onClick={() => dispatch(increment())}>Increment</Button>
//       <Button onClick={() => dispatch(decrement())}>Decrement</Button>
//       <Button onClick={() => dispatch(reset())}>Reset</Button>
//     </div>
//   );
// }


// src/app/page.tsx
"use client";

import { useAppDispatch, useAppSelector } from "@/store/hook";
import { Button } from "@/components/ui/button";
import { decrement, increment, reset } from "@/features/countSlice/countSlice";

export default function Home() {
  // const dispatch = useAppDispatch();
  const dispatch=useAppDispatch();
  const count = useAppSelector((state) => state.counter.value);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold">Count: {count}</h1>
      <div className="space-x-4">
        <Button onClick={() => dispatch(increment())}>Increment</Button>
        <Button onClick={() => dispatch(decrement())}>Decrement</Button>
        <Button onClick={() => dispatch(reset())}>Reset</Button>
      </div>
    </div>
  );
}