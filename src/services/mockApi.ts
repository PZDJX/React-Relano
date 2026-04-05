import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { Gender, User } from '../types';
import toast from 'react-hot-toast';
import { useCallback } from 'react';

const GENDER_KEY = 'genders';
const USER_KEY = 'users';

const getGenders = (): Gender[] => {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(GENDER_KEY);
    return data ? JSON.parse(data) : [
      { id: 1, name: 'Male' },
      { id: 2, name: 'Female' },
      { id: 3, name: 'Other' }
    ];
  } catch {
    return [];
  }
};

const setGenders = (genders: Gender[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(GENDER_KEY, JSON.stringify(genders));
  }
};

const getUsers = (): User[] => {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : [
      { id: 1, name: 'John Doe', email: 'john@example.com', genderId: 1, image: '' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', genderId: 2 },
    ];
  } catch {
    return [];
  }
};

const setUsers = (users: User[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_KEY, JSON.stringify(users));
  }
};

// Gender hooks
export const useGenders
