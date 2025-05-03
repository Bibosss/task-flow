import { useAppDispatch } from '../../store/hooks';
import { addNode } from '../../store/slices/flowSlice';

const ControlsPanel = () => {
  const dispatch = useAppDispatch();

  const handleAddNode = () => {
    const newNode = {
      id: `node-${Date.now()}`,
      type: 'task',
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { label: 'New Task' },
    };
    dispatch(addNode(newNode));
  };

  return (
    <div className="controls-panel">
      <button onClick={handleAddNode} className="add-btn">
        Add Task
      </button>
    </div>
  );
};

export default ControlsPanel;
