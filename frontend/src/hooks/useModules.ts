import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { modulesService } from '../services/module';
import type { Module, ModuleCreate, ModuleUpdate } from '../types/module';

export const useModules = () => {
  return useQuery<Module[]>({
    queryKey: ['modules'],
    queryFn: modulesService.getAll,
  });
};

export const useModule = (id: string) => {
  return useQuery<Module>({
    queryKey: ['modules', id],
    queryFn: () => modulesService.getById(id),
    enabled: !!id,
  });
};

export const useCreateModule = () => {
  const queryClient = useQueryClient();
  return useMutation<Module, Error, ModuleCreate>({
    mutationFn: (payload) => modulesService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['modules'] });
    },
  });
};

export const useUpdateModule = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation<Module, Error, ModuleUpdate>({
    mutationFn: (payload) => modulesService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['modules'] });
      queryClient.invalidateQueries({ queryKey: ['modules', id] });
    },
  });
};