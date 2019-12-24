import api from '../../../apis/$api'; // なんかうまく動かないなぜ？
import { useState, useCallback } from 'react';
import { User as UserEntity } from '@/src/entities/User';

type User = Omit<UserEntity, 'password'>;
export const useEnhance = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(1);
  const [foundUser, setFoundUser] = useState<Partial<User>>({
    id: null,
    name: null,
  });
  const [errorMsg, setErrorMsg] = useState('');

  const submit = useCallback(async (name: string, password: string) => {
    try {
      setErrorMsg('');
      await api().api.user.$post({ name, password });
    } catch (e) {
      setErrorMsg('An Error Occurred');
    }
  }, []);

  const findUserById = useCallback(async (id: number) => {
    const res = await api()
      .api.user._userId(id)
      .$get();
    setFoundUser(res);
  }, []);

  return {
    name,
    setName,
    password,
    setPassword,
    submit,
    foundUser,
    findUserById,
    userId,
    setUserId,
    errorMsg,
  };
};
