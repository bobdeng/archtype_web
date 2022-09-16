import { vi } from 'vitest';
import axios from 'axios';
import * as auth from '@/util/auth-provider';
import { localStorageKey } from '@/util/auth-provider';

// vi.mock('@/util/auth-provider')

describe('Auth', function () {

  describe('Login', function () {

    it('should call api when login', function () {
      const mock = vi.fn().mockResolvedValueOnce({});
      axios.post = mock;
      auth.login({username:"",password:""});
      expect(mock.mock.calls[0][0]).toBe('/api/1.0/users');
    });

    it('should call api with parameters when login', function () {
      const mock = vi.fn().mockResolvedValueOnce({token: 'not-valid-token'});
      axios.post = mock;
      auth.login({username: 'james', password: 'p4sword'});
      expect(mock.mock.calls[0][1]).toStrictEqual({username: 'james', password: 'p4sword'});
    });

    it.skip('should call save method when login successfully', async () => {
      // const spy = vi.spyOn(auth, 'handleUserResponse');
      // vi.mock('./auth-provider', async () => {
      //   const origin = await vi.importActual('./auth-provider');
      //   return {
      //     // @ts-ignore
      //     ...origin,
      //     handleUserResponse: vi.fn()
      //   }
      // });
      axios.post = vi.fn().mockResolvedValueOnce({username: 'james', password: 'p4sword'});
      await auth.login({username: 'james', password: 'p4sword'});
      expect(auth.handleUserResponse).toHaveBeenCalledWith('-');
    });

    it('should save token to local storage when login successfully', async () => {
      const spyInstance = vi.spyOn(Storage.prototype, 'setItem');
      axios.post = vi.fn().mockResolvedValueOnce({token: 'VALID-TOKEN'});
      await auth.login({username: 'james', password: 'p4sword'});
      expect(spyInstance).toHaveBeenCalledWith(localStorageKey, 'VALID-TOKEN');
    });

  });

  describe('Logout', function () {

    it('should remove local storage key when logout', function () {
      const spyInstance = vi.spyOn(Storage.prototype, 'removeItem');
      auth.logout()
      expect(spyInstance).toHaveBeenCalled();
    });

  });

  describe('HandleUserResponse', function () {

    it('should save token to local storage', function () {
      const spyInstance = vi.spyOn(Storage.prototype, 'setItem');
      auth.handleUserResponse({username: 'james', password: 'p4sword', token: 'VALID-TOKEN'})
      expect(spyInstance).toHaveBeenCalledWith(localStorageKey, 'VALID-TOKEN');
    });

  });
});