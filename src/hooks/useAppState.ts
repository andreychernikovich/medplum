import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

type AppStateStatus =
  | 'active'
  | 'background'
  | 'inactive'
  | 'unknown'
  | 'extension';

const useAppState = () => {
  const [appState, setAppState] = useState(AppState.currentState);
  const onChange = (newState: AppStateStatus) => setAppState(newState);

  useEffect(() => {
    const subscriptionOnAppState = AppState.addEventListener(
      'change',
      onChange,
    );

    return () => subscriptionOnAppState.remove();
  }, []);

  return {appState};
};

export default useAppState;
