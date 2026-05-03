import { describe, it, expect } from 'vitest';
import { cn, formatDate } from './utils';

describe('utils', () => {
  describe('cn', () => {
    it('merges class names correctly', () => {
      expect(cn('base', 'extra')).toBe('base extra');
      expect(cn('base', undefined, 'extra')).toBe('base extra');
      expect(cn('base', { active: true }, { hidden: false })).toBe('base active');
    });

    it('handles tailwind conflict resolution', () => {
      expect(cn('p-4', 'p-8')).toBe('p-8');
      expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
    });
  });

  describe('formatDate', () => {
    it('formats valid date strings correctly', () => {
      expect(formatDate('2024-05-02T12:00:00Z')).toBe('02/05/2024');
      expect(formatDate('2023-12-25')).toBe('25/12/2023');
    });

    it('handles ISO strings without time specifically', () => {
      // This is how SWAPI usually returns dates
      expect(formatDate('2014-12-09T13:50:51.644000Z')).toBe('09/12/2014');
    });

    it('formats Date objects correctly', () => {
      const date = new Date(2022, 0, 1); // Jan 1st, 2022
      expect(formatDate(date)).toBe('01/01/2022');
    });

    it('returns empty string for null or undefined', () => {
      expect(formatDate('')).toBe('');
      expect(formatDate(null)).toBe('');
      expect(formatDate(undefined)).toBe('');
    });

    it('returns original string for invalid dates', () => {
      expect(formatDate('not-a-date')).toBe('not-a-date');
    });
  });
});
