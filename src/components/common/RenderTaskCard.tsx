import { TaskCardProps } from '@/types/TaskCard.types';
import React from 'react';
import TaskCard from '../ui/TaskCard';

const RenderTaskCard = ({ item, index }: TaskCardProps) => <TaskCard item={item} index={index} />;

export default RenderTaskCard;
