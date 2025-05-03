import { useEffect, useState } from 'react';
import { Node } from 'reactflow';
import { useAppDispatch } from '../../store/hooks';
import { updateNode } from '../../store/slices/flowSlice';

interface SidebarProps {
  selectedNode: Node | null;
  onClose: () => void;
}

const Sidebar = ({ selectedNode, onClose }: SidebarProps) => {
  const dispatch = useAppDispatch();
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (selectedNode) {
      setLabel(selectedNode.data.label || '');
    }
  }, [selectedNode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLabel = e.target.value;
    setLabel(newLabel);

    if (selectedNode) {
      dispatch(
        updateNode({
          id: selectedNode.id,
          data: { label: newLabel },
        })
      );
    }
  };

  if (!selectedNode) return null;

  return (
    <div className="sidebar">
      <button className="close-btn" onClick={onClose}>
        ×
      </button>
      <h3>Edit Task</h3>
      <div className="form-group">
        <label>Name of Task:</label>
        <input value={label} onChange={handleChange} className="edit-input" />
      </div>
    </div>
  );
};

export default Sidebar;
