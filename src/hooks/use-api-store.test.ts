import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useApiStore } from './use-api-store';

describe('useApiStore', () => {
  beforeEach(() => {
    act(() => {
      useApiStore.getState().reset();
    });
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useApiStore());
    expect(result.current.primaryApiLastFailure).toBe(0);
    expect(result.current.hasShownBackupToast).toBe(false);
  });

  it('updates failure time', () => {
    const { result } = renderHook(() => useApiStore());
    const now = Date.now();

    act(() => {
      result.current.setFailureTime(now);
    });

    expect(result.current.primaryApiLastFailure).toBe(now);
  });

  it('updates backup toast status', () => {
    const { result } = renderHook(() => useApiStore());

    act(() => {
      result.current.setShownBackupToast(true);
    });

    expect(result.current.hasShownBackupToast).toBe(true);
  });

  it('resets to default values', () => {
    const { result } = renderHook(() => useApiStore());

    act(() => {
      result.current.setFailureTime(12345);
      result.current.setShownBackupToast(true);
    });

    expect(result.current.primaryApiLastFailure).toBe(12345);
    expect(result.current.hasShownBackupToast).toBe(true);

    act(() => {
      result.current.reset();
    });

    expect(result.current.primaryApiLastFailure).toBe(0);
    expect(result.current.hasShownBackupToast).toBe(false);
  });
});
