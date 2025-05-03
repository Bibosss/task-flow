import { NodeProps, Handle } from 'reactflow';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { updateNode } from '../../store/slices/flowSlice';
import styles from './TaskNode.module.css';

const TaskNode = ({ id, data, selected }: NodeProps) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);

  useEffect(() => {
    setLabel(data.label);
  }, [data.label]);

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    dispatch(updateNode({ id, data: { label } }));
  };

  return (
    <div className={`${styles.taskNode} ${selected ? styles.selected : ''}`}>
      <Handle type="target" position="top" className={styles.handle} />

      {isEditing ? (
        <input
          type="text"
          value={label}
          onChange={handleLabelChange}
          onBlur={handleBlur}
          autoFocus
          className={styles.nodeInput}
        />
      ) : (
        <div onClick={() => setIsEditing(true)} className={styles.nodeLabel}>
          {label}
        </div>
      )}

      <Handle type="source" position="bottom" className={styles.handle} />
    </div>
  );
};

export default TaskNode;
