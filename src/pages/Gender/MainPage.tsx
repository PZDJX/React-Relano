import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import GenderList from './component/GenderList';
import { Button } from '../../../component/Button/SubmitButton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../../component/Dialog/Dialog';
import { Input } from '../../../component/Input/FloatingLabelInput';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../../../component/AlertDialog/AlertDialog';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Gender } from '../../types';

const genderSchema = z.object({
  name: z.string().min(1, 'Name required'),
});

type GenderForm = z.infer<typeof genderSchema>;

const GenderMain = () => {
  const queryClient = useQueryClient();

  const { data: genders, isLoading } = useQuery({
    queryKey: ['genders'],
    queryFn: () => api.get('/genders').then(res => res.data),
  });

  const addMutation = useMutation({
    mutationFn: (data: GenderForm) => api.post('/genders', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['genders'] });
      setOpen(false);
      form.reset();
    },
  });

  const editMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: GenderForm }) => api.put(`/genders/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['genders'] });
      setEditOpen(false);
      editForm.reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/genders/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['genders'] });
      setDeleteDialogOpen(false);
    },
  });

  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [deletingId, setDeletingId] = React.useState<number | null>(null);

  const form = useForm<GenderForm>({
    resolver: zodResolver(genderSchema),
    defaultValues: { name: '' },
  });

  const editForm = useForm<GenderForm>({
    resolver: zodResolver(genderSchema),
    defaultValues: { name: '' },
  });

  const handleEdit = (id: number) => {
    const gender = genders?.find(g => g.id === id);
    if (gender) {
      editForm.reset({ name: gender.name });
      setEditingId(id);
      setEditOpen(true);
    }
  };

  const handleDelete = (id: number) => {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Genders</h1>
      
      {/* Add Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Add Gender</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Gender</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(addMutation.mutate)} className="space-y-4">
            <Input {...form.register('name')} placeholder="Gender name" />
            {form.formState.errors.name && <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>}
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={addMutation.isPending}>
                {addMutation.isPending ? 'Adding...' : 'Add'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Gender</DialogTitle>
          </DialogHeader>
          <form onSubmit={editForm.handleSubmit((data) => editingId && editMutation.mutate({ id: editingId, data }))} className="space-y-4">
            <Input {...editForm.register('name')} placeholder="Gender name" />
            {editForm.formState.errors.name && <p className="text-red-500 text-sm">{editForm.formState.errors.name.message}</p>}
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={editMutation.isPending}>
                {editMutation.isPending ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete AlertDialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the gender.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => deletingId && deleteMutation.mutate(deletingId)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <GenderList 
          genders={genders || []} 
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default GenderMain;

