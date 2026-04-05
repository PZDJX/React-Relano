import React from 'react';
import type { Gender } from '../../../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

interface GenderListProps {
  genders: Gender[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const GenderList: React.FC<GenderListProps> = ({ genders, onEdit, onDelete }) => {
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {genders.map((gender) => (
            <TableRow key={gender.id}>
              <TableCell>{gender.id}</TableCell>
              <TableCell>{gender.name}</TableCell>
              <TableCell className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(gender.id)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(gender.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GenderList;
