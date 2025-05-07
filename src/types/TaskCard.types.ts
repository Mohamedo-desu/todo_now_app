export interface TaskCardProps {
  item: {
    _id: string;
    title: string;
    description: string;
    dueDate: string | Date;
    status: 'done' | 'in-progress';
    priority: boolean;
  };
}
