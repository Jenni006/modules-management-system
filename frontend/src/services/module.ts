import api from './api';
import type { Module, ModuleCreate, ModuleUpdate } from '../types/module';

export const modulesService = {
  getAll: async (): Promise<Module[]> => {
    const res = await api.get('/modules/');
    return res.data;
  },

  getById: async (id: string): Promise<Module> => {
    const res = await api.get(`/modules/${id}`);
    return res.data;
  },

  create: async (payload: ModuleCreate): Promise<Module> => {
    const res = await api.post('/modules/', payload);
    return res.data;
  },

  update: async (id: string, payload: ModuleUpdate): Promise<Module> => {
    const res = await api.put(`/modules/${id}`, payload);
    return res.data;
  },
}; 