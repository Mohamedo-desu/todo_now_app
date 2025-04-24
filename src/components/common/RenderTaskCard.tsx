import React from 'react';
import TaskCard from '../ui/TaskCard';
import { TaskCardProps } from '@/types/TaskCard.types';

const RenderTaskCard = ({ item, index }: TaskCardProps) => <TaskCard item={item} index={index} />;

export default RenderTaskCard;
