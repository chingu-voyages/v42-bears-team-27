// Repurposed from https://github.com/imbhargav5/rooks/blob/main/packages/rooks/src/hooks/useLocalstorageState.ts

import type { Dispatch, SetStateAction } from 'react';
import { useMemo, useState, useEffect, useCallback, useRef } from 'react';

// Gets value from localstorage
function getValueFromLocalStorage(key: string) {
  if (typeof localStorage === 'undefined') {
    return null;
  }

  const storedValue = localStorage.getItem(key) ?? 'null';
  try {
    return JSON.parse(storedValue);
  } catch (error) {
    // console.error(error);
  }

  return storedValue;
}

// Saves value to localstorage
function saveValueToLocalStorage<S>(key: string, value: S) {
  if (typeof localStorage === 'undefined') {
    return null;
  }

  return localStorage.setItem(key, JSON.stringify(value));
}

/**
 * @param key Key of the localStorage object
 * @param initialState Default initial value
 */
function initialize<S>(key: string, initialState: S) {
  const valueLoadedFromLocalStorage = getValueFromLocalStorage(key);
  if (valueLoadedFromLocalStorage === null) {
    return initialState;
  }

  return valueLoadedFromLocalStorage;
}

type UseLocalstorageStateReturnValue<S> = [
  S,
  Dispatch<SetStateAction<S>>,
  () => void,
];
type BroadcastCustomEvent<S> = CustomEvent<{ newValue: S }>;
/**
 * useLocalstorageState hook
 * Tracks a value within localStorage and updates it
 *
 * @param {string} key - Key of the localStorage object
 * @param {any} initialState - Default initial value
 */
function useLocalstorageState<S>(
  key: string,
  initialState?: S | (() => S),
): UseLocalstorageStateReturnValue<S> {
  const [value, setValue] = useState(() => initialize(key, initialState));
  const isUpdateFromCrossDocumentListener = useRef(false);
  const isUpdateFromWithinDocumentListener = useRef(false);
  const customEventTypeName = useMemo(
    () => `${key}-localstorage-update`,
    [key],
  );

  useEffect(() => {
    /**
     * We need to ensure there is no loop of
     * storage events fired. Hence we are using a ref
     * to keep track of whether setValue is from another
     * storage event
     */
    if (
      !isUpdateFromCrossDocumentListener.current ||
      !isUpdateFromWithinDocumentListener.current
    ) {
      saveValueToLocalStorage<S>(key, value);
    }
  }, [key, value]);

  const listenToCrossDocumentStorageEvents = useCallback(
    (event: StorageEvent) => {
      if (event.storageArea === localStorage && event.key === key) {
        try {
          isUpdateFromCrossDocumentListener.current = true;
          const newValue = JSON.parse(event.newValue ?? 'null');
          if (value !== newValue) {
            setValue(newValue);
          }
        } catch (error) {
          // console.log(error);
        }
      }
    },
    [key, value],
  );

  // check for changes across documents
  useEffect(() => {
    // eslint-disable-next-line no-negated-condition
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', listenToCrossDocumentStorageEvents);

      return () => {
        window.removeEventListener(
          'storage',
          listenToCrossDocumentStorageEvents,
        );
      };
    }
    // console.warn('useLocalstorageState: window is undefined.');

    return () => {};
  }, [listenToCrossDocumentStorageEvents]);

  const listenToCustomEventWithinDocument = useCallback(
    (event: BroadcastCustomEvent<S>) => {
      try {
        isUpdateFromWithinDocumentListener.current = true;
        const { newValue } = event.detail;
        if (value !== newValue) {
          setValue(newValue);
        }
      } catch (error) {
        // console.log(error);
      }
    },
    [value],
  );

  // check for changes within document
  useEffect(() => {
    // eslint-disable-next-line no-negated-condition
    if (typeof document !== 'undefined') {
      // @ts-ignore
      document.addEventListener(
        customEventTypeName,
        listenToCustomEventWithinDocument,
      );

      return () => {
        // @ts-ignore
        document.removeEventListener(
          customEventTypeName,
          listenToCustomEventWithinDocument,
        );
      };
    }
    // console.warn('[useLocalstorageState] document is undefined.');

    return () => {};
  }, [customEventTypeName, listenToCustomEventWithinDocument]);

  const broadcastValueWithinDocument = useCallback(
    (newValue: S) => {
      // eslint-disable-next-line no-negated-condition
      if (typeof document !== 'undefined') {
        const event: BroadcastCustomEvent<S> = new CustomEvent(
          customEventTypeName,
          { detail: { newValue } },
        );
        document.dispatchEvent(event);
      } else {
        // console.warn('[useLocalstorageState] document is undefined.');
      }
    },
    [customEventTypeName],
  );

  const set = useCallback(
    (newValue: S) => {
      isUpdateFromCrossDocumentListener.current = false;
      isUpdateFromWithinDocumentListener.current = false;
      setValue(newValue);
      broadcastValueWithinDocument(newValue);
    },
    [broadcastValueWithinDocument],
  );

  const remove = useCallback(() => {
    localStorage.removeItem(key);
  }, [key]);

  // @ts-ignore
  return [value, set, remove];
}

export default useLocalstorageState;
