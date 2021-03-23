import { useState } from 'react';
import isEqual from 'lodash/isEqual';

// for not re-render component if state was not changed
export const useMemoState = (defState: any) => {
  const [state, setState] = useState(defState)

  const smartSetState = (newState: any) => {
    const areEqual = isEqual(state, newState);
    
    if(!areEqual){
      setState(newState)
    }
  }

  return [state, smartSetState]
}